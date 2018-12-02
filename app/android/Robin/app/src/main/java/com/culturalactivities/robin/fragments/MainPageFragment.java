package com.culturalactivities.robin.fragments;


import android.content.Context;
import android.graphics.drawable.AnimatedVectorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.graphics.drawable.AnimatedVectorDrawableCompat;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.graphics.drawable.AnimatedStateListDrawableCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
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
import com.culturalactivities.robin.adapters.EventAdapter;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.Image;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 */
public class MainPageFragment extends Fragment implements View.OnClickListener {

    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private ArrayList<Event> events = new ArrayList<>();

    private ImageView imageView;


    RequestQueue queue;
    private String EVENTS_URL = "http://139.59.128.92:8080/api/v1/events/";

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }

    public MainPageFragment() {
        // Required empty public constructor
    }

    public static MainPageFragment newInstance(){
        return new MainPageFragment();
    }


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_main_page, container, false);
        setView(view);

        imageView = view.findViewById(R.id.ivDeneme);
        AnimatedVectorDrawable avd = (AnimatedVectorDrawable) imageView.getDrawable();
        avd.start();

        return view;
    }



    private void setView(View view) {
        queue = Volley.newRequestQueue(activity);
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        activity.getSupportActionBar().setSubtitle(activity.getString(R.string.home_page));
        recyclerView = view.findViewById(R.id.rvEvents);
        eventAdapter = new EventAdapter(activity, events, MainPageFragment.this,0);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(eventAdapter);
        getEvents();
    }

    private void getEvents() {
        events.clear();
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                EVENTS_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                String name = jsonObject.getString("name");
                                String info = jsonObject.getString("info");
                                events.add(new Event(name, info));
                            }
                            eventAdapter.notifyDataSetChanged();
                            MainActivity.progressBar.setVisibility(View.INVISIBLE);

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

    /* private void getEvents2() {
        events.clear();
        String[] testimages = {"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Roma06%28js%29.jpg/1200px-Roma06%28js%29.jpg",
        "https://www.travelfashiongirl.com/wp-content/uploads/2017/04/what-to-wear-hiking-the-great-wall-of-china-in-the-summer-cover.jpg",
        "https://www.travelmate.com.pk/wp-content/uploads/2015/05/antalya.jpg",
        "https://www.planetware.com/photos-large/TR/turkey-hot-air-ballooning-over-uchisar-village-cappadocia.jpg",
        "https://www.planetware.com/photos-large/TR/turkey-aya-sofya-exterior.jpg",
        "http://i.hurimg.com/i/hurriyet/75/1110x740/55ea5525f018fbb8f8790adc.jpg",
        "http://inspirich.com/wp-content/uploads/2017/07/the-blue-mosque-500x375.jpg",
        "https://www.touropia.com/gfx/d/ancient-theatres-of-greek-roman-antiquity/aspendos_theatre.jpg",
        "http://placestoseebeforeyoudie.net/wp-content/uploads/2015/03/Marmaris-Turkey.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0d/f4/e8/36/3-day-trip-to-delphi.jpg"};
        for (String i: testimages) {
            Image image = new Image(i, null);
            Image image2 = new Image(testimages[2], null);
            Image image3 = new Image(testimages[5], null);
            Image image4 = new Image(testimages[6], null);
            ArrayList<Image> images = new ArrayList<>();
            images.add(image);
            images.add(image2);
            images.add(image3);
            images.add(image4);
            Event event = new Event();
            event.setEventInfo(getString(R.string.lorem_ipsum_content));
            event.setImages(images);
            event.setRating(4);
            events.add(event);
        }
        eventAdapter.notifyDataSetChanged();
        MainActivity.progressBar.setVisibility(View.INVISIBLE);
    }*/

    @Override
    public void onClick(View view) {
        int position = recyclerView.getChildLayoutPosition(view);
        FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
        transaction.addSharedElement(view.findViewById(R.id.ivBanner), ViewCompat.getTransitionName(view.findViewById(R.id.ivBanner)));
        transaction.add(R.id.fragment, EventFragment.newInstance(events.get(position)));
        transaction.addToBackStack("addEF");
        transaction.commit();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_create_event){
            FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
            transaction.add(R.id.fragment, CreateEventFragment.newInstance());
            transaction.addToBackStack("addCEF");
            transaction.commit();
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.menu_homepage, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }
}
