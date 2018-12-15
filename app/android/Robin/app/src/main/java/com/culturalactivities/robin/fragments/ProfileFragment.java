package com.culturalactivities.robin.fragments;


import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

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
import com.culturalactivities.robin.adapters.SearchUserAdapter;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.Image;
import com.culturalactivities.robin.models.User;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * A simple {@link Fragment} subclass.
 */
public class ProfileFragment extends Fragment implements View.OnClickListener {


    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private ArrayList<Event> events = new ArrayList<>();

    RequestQueue queue;
    public static final String USER_ID = "user_id";
    private String USERS_URL = "http://139.59.128.92:8080/api/v1/users/";
    private String EVENTS_URL = "http://139.59.128.92:8080/api/v1/events/";
    private String userid;

    private SearchUserAdapter userAdapter;
    private ArrayList<User> users = new ArrayList<>();

    private ImageView ivProfile;
    private TextView tvName, tvBio;
    private Button buttonProfile;
    private TabLayout tabLayout;

    private boolean isMe = false, isFriend = false;

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }


    public ProfileFragment() {}

    public static ProfileFragment newInstance(String userid){
        ProfileFragment fragment = new ProfileFragment();
        Bundle args = new Bundle();
        args.putString(USER_ID, userid);
        fragment.setArguments(args);
        return fragment;
    }


    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        setView(view);
        return view;
    }

    private void setView(View view) {
        queue = Volley.newRequestQueue(activity);
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        activity.getSupportActionBar().setSubtitle(activity.getString(R.string.profile));
        recyclerView = view.findViewById(R.id.rvEvents);
        eventAdapter = new EventAdapter(activity, events, this,1);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(eventAdapter);

        userAdapter = new SearchUserAdapter(activity, users, ProfileFragment.this);

        buttonProfile = view.findViewById(R.id.buttonProfile);
        if (userid.equals(MainActivity.pk)){
            isMe = true;
            buttonProfile.setText("EDIT");
        } else {
            isMe = false;
        }

        buttonProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isMe){
                    FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
                    transaction.add(R.id.fragment, EditProfileFragment.newInstance());
                    transaction.addToBackStack("addEPF");
                    transaction.commit();
                }
            }
        });


        ivProfile = view.findViewById(R.id.ivProfile);
        tvName = view.findViewById(R.id.tvName);
        tvBio = view.findViewById(R.id.tvBio);
        getProfile(userid);
        getEvents(null);

        tabLayout = view.findViewById(R.id.tabLayout);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch (tab.getPosition()){
                    case 0:
                        getEvents(null);
                        break;
                    case 1:
                        getFollowings();
                        break;
                    case 2:
                        getFollowings();
                        break;
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
    }

    private void getEvents(String query) {
        String EURL = EVENTS_URL;
        if (query != null){
            EURL = EVENTS_URL + "search/?search=" + query;
        }
        events.clear();
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                EURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                String id = jsonObject.getString("id");
                                String name = jsonObject.getString("name");
                                String info = jsonObject.getString("info");
                                String artist = jsonObject.getString("artist");
                                String date = jsonObject.getString("date");
                                String time = jsonObject.getString("time");
                                String image = jsonObject.getString("country"); // TODO: 04.12.2018 Here will change
                                Double price = Double.valueOf(jsonObject.getString("price"));
                                Float rating = Float.valueOf(jsonObject.getString("rating"));
                                ArrayList<Image> images = new ArrayList<>();
                                images.add(new Image(image, null));
                                events.add(new Event(id, name, info, artist, date, time, price, rating, null, null, null, null, images));
                            }
                            recyclerView.setAdapter(eventAdapter);
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

    private void getProfile(String id) {
        String UURL = USERS_URL + id;
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                UURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            String username = jsonObject.getString("username");
                            String fname = jsonObject.getString("first_name");
                            String lname = jsonObject.getString("last_name");
                            String bio = jsonObject.getString("bio");
                            String image = jsonObject.getString("profile_pic");

                            tvName.setText(fname + " " + lname);
                            //Glide.with(activity).load(image).into(ivProfile);
                            // TODO: 05.12.2018 Waiting for profile picture link from backend
                            tvBio.setText(bio);
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

    private void getFollowings() {
        users.clear();
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                USERS_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                String id = jsonObject.getString("id");
                                String username = jsonObject.getString("username");
                                String fname = jsonObject.getString("first_name");
                                String lname = jsonObject.getString("last_name");
                                String bio = jsonObject.getString("bio");
                                //String colorScheme = jsonObject.getString("colorScheme");
                                //String userimage = jsonObject.getString("profile_pic");
                                double rating = Double.parseDouble(jsonObject.getString("rating"));
                                users.add(new User(id, "", username, fname, lname, bio, null, "", rating));
                            }
                            recyclerView.setAdapter(userAdapter);
                            userAdapter.notifyDataSetChanged();
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

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            userid = getArguments().getString(USER_ID);
        }
    }

    @Override
    public void onClick(View view) {

    }
}
