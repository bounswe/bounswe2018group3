package com.culturalactivities.robin.fragments;


import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.SearchView;
import android.widget.Switch;
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
public class MainPageFragment extends Fragment implements View.OnClickListener {

    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private ArrayList<Event> events = new ArrayList<>();


    private SearchUserAdapter userAdapter;
    private ArrayList<User> users = new ArrayList<>();

    private SearchView searchView;
    private Switch switchSearch;
    private boolean isUserSearch = false;

    RequestQueue queue;
    private String EVENTS_URL = "http://139.59.128.92:8080/api/v1/events/";
    private String USERS_URL = "http://139.59.128.92:8080/api/v1/users/search/?search=";

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
        getEvents(null);

        userAdapter = new SearchUserAdapter(activity, users, MainPageFragment.this);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        //recyclerView.setAdapter(userAdapter);

        searchView = view.findViewById(R.id.searchView);
        switchSearch= view.findViewById(R.id.switchSearch);

        switchSearch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                isUserSearch = isChecked;
                if (isChecked){
                    searchView.setQueryHint("Search a user");
                }else {
                    searchView.setQueryHint("Search an event");
                }
            }
        });

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                if (isUserSearch){
                    getSearchUser(query);
                }else {
                    getEvents(query);
                }
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
    }

    private void getSearchUser(String query) {
        String UURL = USERS_URL + query.trim();
        users.clear();
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                UURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                String username = jsonObject.getString("username");
                                String fname = jsonObject.getString("first_name");
                                String lname = jsonObject.getString("last_name");
                                String bio = jsonObject.getString("bio");
                                //String colorScheme = jsonObject.getString("colorScheme");
                                //String userimage = jsonObject.getString("profile_pic");
                                double rating = Double.parseDouble(jsonObject.getString("rating"));
                                users.add(new User("", username, fname, lname, bio, null, "", rating));
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
                                String image = jsonObject.getString("country"); // TODO: 04.12.2018 Here will change
                                Double price = Double.valueOf(jsonObject.getString("price"));
                                Float rating = Float.valueOf(jsonObject.getString("rating"));
                                ArrayList<Image> images = new ArrayList<>();
                                images.add(new Image(image, null));
                                events.add(new Event(id, name, info, artist, date, price, rating, null, null, null, null, images));
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

    @Override
    public void onClick(View view) {
        int position = recyclerView.getChildLayoutPosition(view);
        if (isUserSearch){
            // TODO: 04.12.2018  here will be edit
            Toast.makeText(activity, "It is cominggg... " + users.get(position).getUsername(), Toast.LENGTH_SHORT).show();
        }else {
            FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
            transaction.addSharedElement(view.findViewById(R.id.ivEvent), ViewCompat.getTransitionName(view.findViewById(R.id.ivEvent)));
            transaction.add(R.id.fragment, EventFragment.newInstance(events.get(position)));
            transaction.addToBackStack("addEF");
            transaction.commit();
        }
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
        if(!MainActivity.isGuest) {
            inflater.inflate(R.menu.menu_homepage, menu);
        }else{
            inflater.inflate(R.menu.menu_homepage_guest, menu);
        }
        super.onCreateOptionsMenu(menu, inflater);
    }
}
