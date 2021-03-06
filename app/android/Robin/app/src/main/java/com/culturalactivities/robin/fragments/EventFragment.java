package com.culturalactivities.robin.fragments;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.LocaleList;
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
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.ServerError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.adapters.CommentAdapter;
import com.culturalactivities.robin.adapters.ImageAdapter;
import com.culturalactivities.robin.models.Comment;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.Image;
import com.culturalactivities.robin.models.User;
import com.culturalactivities.robin.utilities.Constants;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONArray;
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
    private Event event= new Event();
    private String eventid;
    private double lat = 0, lon = 0;
    private ImageView ivBanner;
    private TextView tvTitle, tvDescription, tvArtistInfo, tvPrice, tvDate;
    private RatingBar rbEvent, rbMakeRate;
    private ArrayList<Image> images = new ArrayList<>();

    //comments part
    private RecyclerView recyclerView;
    private CommentAdapter commentAdapter;
    private ArrayList<Comment> comments = new ArrayList<>();


    // image gallery
    private RecyclerView rvGallery;
    private ImageAdapter imageAdapter;


    // for comment
    private Button buttonComment, buttonInterested, buttonAttend;
    private EditText etComment, etCommentTitle;
    private Date today = Calendar.getInstance().getTime();
    private SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    private String date = fmt.format(today);
    //Google Map
    GoogleMap map;
    MapView mapView;

    private boolean isAttended = false, isInterested = false;

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }

    public EventFragment() {
        // Required empty public constructor
    }

    public static EventFragment newInstance(String eventid) {
        EventFragment fragment = new EventFragment();
        fragment.setEvent(eventid);
        return fragment;
    }
    public static EventFragment newInstance(String eventid, double lat, double lon) {
        EventFragment fragment = new EventFragment();
        fragment.setEvent(eventid, lat, lon);
        return fragment;
    }

    private void setEvent(String eventid){
        this.eventid = eventid;
    }

    private void setEvent(String eventid, double lat, double lon){
        this.eventid = eventid;
        this.lat = lat;
        this.lon = lon;
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

    //@SuppressLint("SetTextI18n")
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

        rbMakeRate.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
               // Log.e("sizeee3","here "+event.getComments().size()+" "+event.getId()+" "+eventid);
                rateEvent(rating);
                //Log.e("sizeee4","here "+event.getComments().size()+" "+event.getId()+" "+eventid);
            }
        });
        //Log.e("sizeee","here "+event.getComments().size()+" "+event.getArtistInfo()+" "+eventid);
        //comments part
        recyclerView = view.findViewById(R.id.rvComments);
        commentAdapter = new CommentAdapter(activity, comments, EventFragment.this);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(commentAdapter);

        buttonInterested = view.findViewById(R.id.buttonInterested);
        buttonAttend = view.findViewById(R.id.buttonAttend);

        getEventDetails();
        getComments();

        //Log.e("sizeee2","here "+event.getComments().size()+" "+event.getId()+" "+eventid);
        // image gallery
        rvGallery = view.findViewById(R.id.rvGallery);
        imageAdapter = new ImageAdapter(activity, event.getImages(), EventFragment.this);
        rvGallery.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.HORIZONTAL, false));
        rvGallery.setAdapter(imageAdapter);


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
                makeComment(comment,commentTitle);
            }
        });


        buttonInterested.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isInterested){
                    setInterested(Request.Method.DELETE);
                }else {
                    setInterested(Request.Method.GET);
                }

                buttonInterested.setText("Interested?");
                buttonInterested.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimary));
            }
        });

        buttonAttend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isAttended){
                    setAttend(Request.Method.DELETE);
                }else {
                    setAttend(Request.Method.GET);
                }
                buttonAttend.setText("Attend?");
                buttonAttend.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimary));
            }
        });
        if (MainActivity.isGuest){
            etComment.setVisibility(View.INVISIBLE);
            etCommentTitle.setVisibility(View.INVISIBLE);
            buttonComment.setVisibility(View.INVISIBLE);
            buttonInterested.setVisibility(View.INVISIBLE);
            buttonAttend.setVisibility(View.INVISIBLE);
            rbMakeRate.setVisibility(View.INVISIBLE);
        }
    }

    private void getEventDetails() {
        isInterested = false;
        isAttended= false;
        String url = Constants.EVENTS_URL + eventid;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        JSONObject jsonObject = null;
                        try {
                            jsonObject = new JSONObject(response);
                            String id = toUTF(jsonObject.getString("id"));
                            String name = toUTF(jsonObject.getString("name"));
                            String info = toUTF(jsonObject.getString("info"));
                            String artist = toUTF(jsonObject.getString("artist"));
                            String date = toUTF(jsonObject.getString("date"));
                            String time = toUTF(jsonObject.getString("time"));
                            double lattitude = jsonObject.getDouble("loc_lattitude");
                            double longitude = jsonObject.getDouble("loc_longitude");
                            //String image = toUTF(jsonObject.getString("country")); // TODO: 04.12.2018 Here will change
                            /*JSONArray commentArray= jsonObject.getJSONArray("comments");
                            for(int j=0;j<commentArray.length();j++){
                                comments.add(new Comment(commentArray.get(j).toString(),id));
                            }*/
                            Double price = Double.valueOf(jsonObject.getString("price"));
                            Float rating = Float.valueOf(jsonObject.getString("rating"));

                            JSONArray arrayAttendants = jsonObject.getJSONArray("attendants");

                            for (int i = 0; i < arrayAttendants.length(); i++) {
                                String attendantid = arrayAttendants.get(i).toString();
                                if (attendantid.equals(MainActivity.pk)){
                                    isAttended = true;
                                    buttonAttend.setText("Attending");
                                    buttonAttend.setBackgroundColor(Color.GREEN);
                                }
                            }
                            JSONArray arrayInterestants = jsonObject.getJSONArray("interestants");

                            for (int i = 0; i < arrayInterestants.length(); i++) {
                                String interestantid = arrayInterestants.get(i).toString();
                                if (interestantid.equals(MainActivity.pk)){
                                    isInterested = true;
                                    buttonInterested.setText("Interested");
                                    buttonInterested.setBackgroundColor(Color.GREEN);
                                }
                            }

                            JSONArray imagesArray= jsonObject.getJSONArray("images");
                            if (imagesArray.length()>0){
                                getImage(imagesArray.get(0).toString());
                            }else {
                                Glide.with(activity).load(R.drawable.eventimage).into(ivBanner);
                            }

                            event = new Event(id, name,info, artist, date, time, price, rating, null, comments, null, null, images);
                            tvTitle.setText(event.getEventName());
                            tvDescription.setText(event.getEventInfo());
                            rbEvent.setRating(event.getRating());

                            tvArtistInfo.setText(event.getArtistInfo());
                            tvPrice.setText(event.getPrice()+ " ₺");
                            tvDate.setText(event.getTime().substring(0,5) +"  " + event.getDate());

                            rvGallery.setAdapter(imageAdapter);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
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

    /*private void getImages(JSONArray imagesArray) {
        images.clear();
        for (int i = 0; i < imagesArray.length(); i++) {
            try {
                getImage(imagesArray.get(i).toString());
                Log.d("IMAGES"+i, images.toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        if (images.size()>0){
            Glide.with(activity).load(images.get(0).getUrl()).into(ivBanner);
            imageAdapter.notifyDataSetChanged();
        }
    }*/

    private void getImage(final String imageid) {
        String url = Constants.EVENT_IMAGES_URL + imageid;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            String url = jsonObject.getString("content");
                            Glide.with(activity).load(url).into(ivBanner);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
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

    private void setInterested(int requestCode) {
        String url = Constants.EVENT_INTEREST_URL + event.getId();
        StringRequest jsonObjReq = new StringRequest(requestCode,
                url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("INTERESTEDDD", response);
                        getEventDetails();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
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
    private void setAttend(int requestType) {
        String url = Constants.EVENT_ATTEND_URL + event.getId();
        StringRequest jsonObjReq = new StringRequest(requestType, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("ATTENDED", response);
                        getEventDetails();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
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

    private void rateEvent(float rating) {
        String url = Constants.RATE_URL + event.getId()+ "/" + (int) rating;
        //Log.e("sizeee","here "+event.getComments().size()+" "+event.getId()+" "+eventid);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        JSONArray jsonArray = new JSONArray();
                        try {
                            rbEvent.setRating(Float.parseFloat(jsonArray.get(0).toString()));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
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
        Log.e("commentxxx",comment+" "+commentTitle);
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

        StringRequest stringRequest = new StringRequest(Request.Method.POST,
                Constants.COMMENT_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        try {
                            JSONObject json= new JSONObject(response);
                            Toast.makeText(activity, "Thanks for your comment", Toast.LENGTH_SHORT).show();
                            MainActivity.progressBar.setVisibility(View.INVISIBLE);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                //Toast.makeText(LoginActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                NetworkResponse response = error.networkResponse;
                if (error instanceof ServerError && response != null) {
                    try {
                        String res = new String(response.data,
                                HttpHeaderParser.parseCharset(response.headers, "utf-8"));
                        // Now you can use any deserializer to make sense of data
                        Log.d("RESSOO", res);
                        //JSONObject obj = new JSONObject(res);
                    } catch (UnsupportedEncodingException e1) {
                        // Couldn't properly decode data to string
                        e1.printStackTrace();
                    }
                }
                Toast.makeText(activity, "Failed!", Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("event", eventid);
                params.put("content", comment);
                params.put("title", commentTitle);
                return params;
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(stringRequest);

    }
    private void getComments() {
        String getCommentURL= Constants.COMMENT_URL;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                getCommentURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);

                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                String id = toUTF(jsonObject.getString("id"));
                                String content = toUTF(jsonObject.getString("content"));
                                String title = toUTF(jsonObject.getString("title"));
                                String author = toUTF(jsonObject.get("author").toString());
                                String date = toUTF(jsonObject.getString("date"));
                                String authorfirstname = toUTF(jsonObject.getString("authorFirstName"));
                                String authorlastname = toUTF(jsonObject.getString("authorLastName"));
                                String authorpicture = toUTF(jsonObject.getString("authorProfilePic"));
                                date=date.substring(11,16)+"  "+date.substring(0,10);
                                String commenteventid = toUTF(jsonObject.getString("event"));
                                if (commenteventid.equals(eventid)){
                                    comments.add(new Comment(id, new User(author,"",authorfirstname,  authorlastname, authorpicture), commenteventid, title, content, date, 0));
                                }
                            }
                            event.setComments(comments);
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
        map.addMarker(new MarkerOptions().position(new LatLng(lat, lon)).title(event.getEventName()).snippet("Event Location"));
        CameraPosition position = CameraPosition.builder().target(new LatLng(lat, lon)).zoom(14).build();
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
