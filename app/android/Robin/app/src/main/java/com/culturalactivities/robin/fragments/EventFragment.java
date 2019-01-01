package com.culturalactivities.robin.fragments;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.transition.TransitionInflater;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.adapters.CommentAdapter;
import com.culturalactivities.robin.adapters.ImageAdapter;
import com.culturalactivities.robin.models.Comment;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.User;
import com.culturalactivities.robin.utilities.Constants;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class EventFragment extends Fragment implements View.OnClickListener, OnMapReadyCallback {


    RequestQueue queue;
    private Event event;
    private ImageView ivBanner;
    private TextView tvTitle, tvDescription, tvArtistInfo, tvPrice, tvDate;
    private RatingBar rbEvent, rbMakeRate;


    //comments part
    private RecyclerView recyclerView;
    private CommentAdapter commentAdapter;
    private ArrayList<Comment> comments = new ArrayList<>();


    // image gallery
    private RecyclerView rvGallery;
    private ImageAdapter imageAdapter;


    // for comment
    private Button buttonComment;
    private EditText etComment, etCommentTitle;
    private Date today = Calendar.getInstance().getTime();
    private SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    private String date = fmt.format(today);
    //Google Map
    GoogleMap map;
    MapView mapView;

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }


    public EventFragment() {
        // Required empty public constructor
    }

    public static EventFragment newInstance(Event event) {
        EventFragment fragment = new EventFragment();
        fragment.setEvent(event);
        return fragment;
    }

    private void setEvent(Event event){
        this.event = event;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            setSharedElementEnterTransition(TransitionInflater.from(getContext()).inflateTransition(android.R.transition.move));
        }
        setHasOptionsMenu(true);
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        menu.clear();
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_event, container, false);
        setView(view);
        return view;
    }

    @SuppressLint("SetTextI18n")
    private void setView(View view) {
        queue = Volley.newRequestQueue(activity);
        ivBanner = view.findViewById(R.id.ivProfile);
        tvTitle = view.findViewById(R.id.tvTitle);
        tvArtistInfo = view.findViewById(R.id.tvArtistInfo);
        tvPrice = view.findViewById(R.id.tvPrice);
        tvDescription = view.findViewById(R.id.tvDescription);
        rbEvent = view.findViewById(R.id.rbEvent);
        rbMakeRate = view.findViewById(R.id.rbMakeRate);
        tvDate = view.findViewById(R.id.tvDate);

        tvTitle.setTypeface(MainActivity.ubuntuBold);
        tvDescription.setTypeface(MainActivity.ubuntuItalic);
        tvDate.setTypeface(MainActivity.ubuntuRegular);
        tvArtistInfo.setTypeface(MainActivity.ubuntuRegular);
        tvPrice.setTypeface(MainActivity.ubuntuRegular);

        //Glide.with(view).load(event.getImages().get(0).getUrl()).into(ivBanner);
        tvTitle.setText(event.getEventName());
        tvDescription.setText(event.getEventInfo());
        rbEvent.setRating(event.getRating());

        rbMakeRate.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
                rateEvent(rating);
            }
        });

        tvArtistInfo.setText(event.getArtistInfo());
        tvPrice.setText(event.getPrice()+ " ₺");
        tvDate.setText(event.getTime().substring(0,5) +"  " + event.getDate());
        
        // image gallery
        rvGallery = view.findViewById(R.id.rvGallery);
        imageAdapter = new ImageAdapter(activity, event.getImages(), EventFragment.this);
        rvGallery.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.HORIZONTAL, false));
        rvGallery.setAdapter(imageAdapter);

        //comments part
        recyclerView = view.findViewById(R.id.rvComments);
        commentAdapter = new CommentAdapter(activity, comments, EventFragment.this);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(commentAdapter);
        getComments();

        mapView = view.findViewById(R.id.map);
        if (mapView != null){
            mapView.onCreate(null);
            mapView.onResume();
            mapView.getMapAsync(this);
        }

        // make comment
        etComment = view.findViewById(R.id.etComment);
        etCommentTitle = view.findViewById(R.id.etCommentTitle);
        buttonComment = view.findViewById(R.id.buttonComment);

        buttonComment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String comment = etComment.getText().toString();
                String commentTitle = etCommentTitle.getText().toString();
                if (TextUtils.isEmpty(comment)){
                    Toast.makeText(activity, "Please write a comment", Toast.LENGTH_SHORT).show();
                    return;
                }
                //Toast.makeText(activity, "Waiting for real comment api endpoint", Toast.LENGTH_SHORT).show();
                makeComment(comment,commentTitle);
            }
        });
    }

    private void rateEvent(float rating) {
        String url = Constants.RATE_URL + event.getId()+ "/" + (int) rating;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        rbEvent.setRating(Float.parseFloat(response));
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("type", "post");
                params.put("Content-Type", "application/json");
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }

    private void makeComment(final String comment, final String commentTitle) {
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        /*try {
            HttpResponse<String> response = Unirest.post("http://139.59.128.92:8080/api/v1/eventcomments/")
                    .header("Content-Type", "application/json")
                    .header("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImNhZ2Rhc3RvbWJ1bCIsImV4cCI6MTU0Njk0MzIwOSwiZW1haWwiOiJjYWdkYXN0b21idWxAaG90bWFpbC5jb20ifQ.tiPyqrvGpHR8_hZ4bNVs0BtWA12JIjN-V1pFqbjbBgk")
                    .header("cache-control", "no-cache")
                    .header("Postman-Token", "c01801b1-0fdd-4558-9b2d-e0729c7594b4")
                    .body("{\"title\":\"deneme\",\"content\":\"super event\",\"event\":\"2\",\"ratings\":[]}")
                    .asString();
            Log.e("comment created","super");
        } catch (UnirestException e) {
            e.printStackTrace();
        }*/

        /*StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                Constants.COMMENT_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // TODO: 15.12.2018
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                //Toast.makeText(LoginActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "Failed!", Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("author", MainActivity.pk);
                params.put("event", event.getId());
                params.put("content", comment);
                params.put("date", date);
                params.put("title", commentTitle);
                return params;
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Content-Type", "application/json");
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
        */
    }

    private void getComments() {
        comments.clear();
        //User user = new User("0", "test@test.com", "Tester", "password");
        for(int i=0;i<event.getComments().size();i++){
            //Log.e("here","here "+event.getComments().get(i).getEventId()+" "+event.getId());
            if(event.getComments().get(i).getEventId().equals(event.getId())){
                getComment(event.getComments().get(i).getId());
                //user.setName(event.getComments().get(i).getId());
            }
        }
        //Comment comment = new Comment("",user,"", getString(R.string.lorem_ipsum_base), "7 November 2018", 4);
        //comments.add(comment);
        /*User user2 = new User("0", "test@test.com", "Tester", "pass");
        user2.setName("Fatih Arslan");
        Comment comment2 = new Comment("",user2,"", getString(R.string.lorem_ipsum_content), "5 April 2018", 3);
        comments.add(comment2);
        commentAdapter.notifyDataSetChanged();*/
    }
    private void getComment(final String commentId) {
        String getCommentURL= Constants.COMMENT_URL+commentId;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                getCommentURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            String content = toUTF(jsonObject.getString("content"));
                            String title = toUTF(jsonObject.getString("title"));
                            String author = toUTF(jsonObject.getString("author"));
                            String date = toUTF(jsonObject.getString("date"));
                            date=date.substring(11,16)+"  "+date.substring(0,10);
                            String event = toUTF(jsonObject.getString("event"));
                            Comment comment = new Comment(commentId, new User(author,"","",""), event, title, content, date, 4);
                            comments.add(comment);
                            commentAdapter.notifyDataSetChanged();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                //Toast.makeText(LoginActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "Failed!", Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }
    @Override
    public void onClick(View view) {

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        MapsInitializer.initialize(activity);
        map = googleMap;
        map.setMapType(GoogleMap.MAP_TYPE_NORMAL);
        map.addMarker(new MarkerOptions().position(new LatLng(41.085830, 29.046891)).title(event.getEventName()).snippet("huhuu"));
        CameraPosition position = CameraPosition.builder().target(new LatLng(41.085830, 29.046891)).zoom(14).build();
        map.moveCamera(CameraUpdateFactory.newCameraPosition(position));
    }
    public String toUTF(String str){
        try {
            byte ptext[] = str.getBytes("ISO-8859-1");
            str = new String(ptext, "UTF-8");
        }catch(UnsupportedEncodingException ex){

        }
        return str;
    }
}
