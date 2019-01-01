package com.culturalactivities.robin.fragments;


import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.SearchView;
import android.widget.Switch;
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
import com.culturalactivities.robin.adapters.EventAdapter;
import com.culturalactivities.robin.adapters.SearchUserAdapter;
import com.culturalactivities.robin.models.Comment;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.Image;
import com.culturalactivities.robin.models.Tag;
import com.culturalactivities.robin.models.User;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
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
    private boolean isSearchOpen = false;
    private ImageView createButton;
    private ConstraintLayout clSearch;

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
        //Toast.makeText(this.activity, "type is "+MainActivity.token, Toast.LENGTH_LONG).show();
        //Log.d("access only Token is", String.valueOf(MainActivity.token));
        queue = Volley.newRequestQueue(activity);
        MainActivity.progressBar.setVisibility(View.VISIBLE);
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

        clSearch = view.findViewById(R.id.cLSearch);
        createButton = view.findViewById(R.id.ivCreate);
        if(MainActivity.token!=null) {
            createButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
                    transaction.add(R.id.fragment, CreateEventFragment.newInstance());
                    transaction.addToBackStack("addEPF");
                    transaction.commit();

                }
            });
        }else{
            createButton.setVisibility(createButton.INVISIBLE);
        }
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
                isSearchOpen = false;
                clSearch.animate().translationY(0);
                searchView.setQuery("", false);
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
                                String id = toUTF(jsonObject.getString("id"));
                                String username = toUTF(jsonObject.getString("username"));
                                String fname = toUTF(jsonObject.getString("first_name"));
                                String lname = toUTF(jsonObject.getString("last_name"));
                                String bio = toUTF(jsonObject.getString("bio"));
                                //String colorScheme = jsonObject.getString("colorScheme");
                                //String userimage = jsonObject.getString("profile_pic");
                                //double rating = Double.parseDouble(jsonObject.getString("rating"));
                                users.add(new User(id, "", username, fname, lname, bio, null, ""));
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
                //params.put("type", "post");
                params.put("Content-Type", "application/json");
                //params.put("Authorization", "JWT " + MainActivity.token);
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
        // Some Test Tags
        String[] tagsArray = {"concert", "istanbul", "event", "new", "smile", "newest", "notification", "tag", "comment"};
        final ArrayList<Tag> tags = new ArrayList<>();
        final ArrayList<Comment> comments = new ArrayList<>();
        for(String s: tagsArray){
            tags.add(new Tag(s, 0, null));
        }
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
                                String id = toUTF(jsonObject.getString("id"));
                                String name = toUTF(jsonObject.getString("name"));
                                String info = toUTF(jsonObject.getString("info"));
                                String artist = toUTF(jsonObject.getString("artist"));
                                String date = toUTF(jsonObject.getString("date"));
                                String time = toUTF(jsonObject.getString("time"));
                                //String image = toUTF(jsonObject.getString("country")); // TODO: 04.12.2018 Here will change
                                JSONArray commentArray= jsonObject.getJSONArray("comments");
                                for(int j=0;j<commentArray.length();j++){
                                    comments.add(new Comment(commentArray.get(j).toString(),id));
                                }
                                Double price = Double.valueOf(jsonObject.getString("price"));
                                Float rating = Float.valueOf(jsonObject.getString("rating"));
                                ArrayList<Image> images = new ArrayList<>();
                                //images.add(new Image(image, null));
                                events.add(new Event(id, name,info, artist, date, time, price, rating, null, comments, null, tags, images));
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
                //params.put("Authorization", "JWT " + MainActivity.token);
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
        switch (view.getId()){
            case R.id.simple_event:
                int p1 = recyclerView.getChildLayoutPosition(view);
                FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
                transaction.add(R.id.fragment, EventFragment.newInstance(events.get(p1)));
                transaction.addToBackStack("addEF");
                transaction.commit();
                break;
            case R.id.simple_search_user:
                int p2 = recyclerView.getChildLayoutPosition(view);
                FragmentTransaction transaction2 = activity.getSupportFragmentManager().beginTransaction();
                transaction2.add(R.id.fragment, ProfileFragment.newInstance(users.get(p2).getId()));
                transaction2.addToBackStack("addPF");
                transaction2.commit();
                break;
            case R.id.simple_textview:
                String tag = String.valueOf(((TextView) view.findViewById(R.id.tvTag)).getText());
                Toast.makeText(activity, tag, Toast.LENGTH_SHORT).show();
                break;
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_search){
            if (isSearchOpen){
                isSearchOpen = false;
                clSearch.animate().translationY(0);
            }else {
                isSearchOpen = true;
                clSearch.animate().translationY(clSearch.getHeight()*3/2);
            }
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
    public String toUTF(String str){
        try {
            byte ptext[] = str.getBytes("ISO-8859-1");
            str = new String(ptext, "UTF-8");
        }catch(UnsupportedEncodingException ex){

        }
        return str;
    }
}
