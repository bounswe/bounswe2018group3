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
public class SearchFragment extends Fragment implements View.OnClickListener {

    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private ArrayList<Event> events = new ArrayList<>();


    private SearchUserAdapter userAdapter;
    private ArrayList<User> users = new ArrayList<>();

    private SearchView searchView;
    private Switch switchSearch;
    private boolean isUserSearch = true;

    RequestQueue queue;
    private String EVENTS_URL = "http://139.59.128.92:8080/api/v1/events/";
    private String USERS_URL = "http://139.59.128.92:8080/api/v1/users/";

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }

    public SearchFragment() {
        // Required empty public constructor
    }

    public static SearchFragment newInstance(){
        return new SearchFragment();
    }


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_search, container, false);
        setView(view);

        return view;
    }



    private void setView(View view) {
        queue = Volley.newRequestQueue(activity);
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        activity.getSupportActionBar().setSubtitle(activity.getString(R.string.home_page));
        recyclerView = view.findViewById(R.id.rvEvents);
        eventAdapter = new EventAdapter(activity, events, SearchFragment.this,0);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(eventAdapter);
        getEvents();

        userAdapter = new SearchUserAdapter(activity, users, SearchFragment.this);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        //recyclerView.setAdapter(userAdapter);

        searchView = view.findViewById(R.id.searchView);
        switchSearch= view.findViewById(R.id.switchSearch);

        switchSearch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                isUserSearch = isChecked;
                if (isChecked){
                    searchView.setQueryHint("Search User");
                }else {
                    searchView.setQueryHint("Search Event");
                }
            }
        });

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                if (isUserSearch){
                    getSearchUser(query);
                }else {
                    getSearchEvent(query);
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
        //String newUrl = USERS_URL + "...." + query;
        // TODO: 02.12.2018 url will be edit after backend works
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
                                String name = jsonObject.getString("name");
                                String info = jsonObject.getString("info");
                                // users.add...
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

    private void getSearchEvent(String query) {
        //String newUrl = EVENTS_URL + "...." + query;
        // TODO: 02.12.2018 url will be edit after backend works
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

    @Override
    public void onClick(View view) {
        int position = recyclerView.getChildLayoutPosition(view);
        FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
        transaction.addSharedElement(view.findViewById(R.id.ivProfile), ViewCompat.getTransitionName(view.findViewById(R.id.ivProfile)));
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