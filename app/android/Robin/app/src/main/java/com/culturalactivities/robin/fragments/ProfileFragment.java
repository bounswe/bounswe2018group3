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
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.adapters.EventAdapter;
import com.culturalactivities.robin.adapters.SearchUserAdapter;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.User;
import com.culturalactivities.robin.utilities.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
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
    private String userid;

    private SearchUserAdapter followersAdapter, followingAdapters;
    private ArrayList<User> followers = new ArrayList<>();
    private ArrayList<User> followings = new ArrayList<>();

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
        recyclerView = view.findViewById(R.id.rvEvents);
        eventAdapter = new EventAdapter(activity, events, this,1);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(eventAdapter);

        followersAdapter = new SearchUserAdapter(activity, followers, ProfileFragment.this);
        followingAdapters = new SearchUserAdapter(activity, followings, ProfileFragment.this);

        buttonProfile = view.findViewById(R.id.buttonProfile);
        if (userid.equals(MainActivity.pk)){
            isMe = true;
            buttonProfile.setText("EDIT");
        } else {
            isMe = false;
            if (isFriend){
                buttonProfile.setText("Unfollow");
            }else {
                buttonProfile.setText("Follow");
            }
        }

        buttonProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isMe){
                    FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
                    transaction.add(R.id.fragment, EditProfileFragment.newInstance());
                    transaction.addToBackStack("addEPF");
                    transaction.commit();
                }else if (isFriend){
                    follow(Request.Method.DELETE);
                }else {
                    follow(Request.Method.GET);
                }
            }
        });


        ivProfile = view.findViewById(R.id.ivProfile);
        tvName = view.findViewById(R.id.tvName);
        tvBio = view.findViewById(R.id.tvBio);

        tabLayout = view.findViewById(R.id.tabLayout);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch (tab.getPosition()){
                    case 0:
                        recyclerView.setAdapter(eventAdapter);
                        eventAdapter.notifyDataSetChanged();
                        break;
                    case 1:
                        recyclerView.setAdapter(followingAdapters);
                        followersAdapter.notifyDataSetChanged();
                        break;
                    case 2:
                        recyclerView.setAdapter(followersAdapter);
                        followersAdapter.notifyDataSetChanged();
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

        getProfile(userid);
    }

    private void getProfile(String id) {
        String UURL = USERS_URL + id;
        events.clear();
        followers.clear();
        followings.clear();
        isFriend = false;
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                UURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        MainActivity.progressBar.setVisibility(View.INVISIBLE);
                        try {
                            JSONObject jsonObj = new JSONObject(response);

                            // get user base info
                            String username = toUTF(jsonObj.getString("username"));
                            String fname = toUTF(jsonObj.getString("first_name"));
                            String lname = toUTF(jsonObj.getString("last_name"));
                            String bio = toUTF(jsonObj.getString("bio"));
                            String image = toUTF(jsonObj.getString("profile_pic"));

                            tvName.setText(fname + " " + lname);
                            Glide.with(activity).load(image).into(ivProfile);
                            // TODO: 05.12.2018 Waiting for profile picture link from backend
                            tvBio.setText(bio);



                            // get events of user
                            events.add(new Event(false, 2,"0","Future Events"));
                            JSONArray futureEventArray= jsonObj.getJSONArray("futureEvents");
                            for(int j=0;j<futureEventArray.length();j++){
                                events.add(new Event(false,1, String.valueOf(futureEventArray.getJSONArray(j).get(0)),futureEventArray.getJSONArray(j).get(1).toString()));
                            }
                            events.add(new Event(false, 2,"0","Past Events"));
                            jsonObj = new JSONObject(response);;
                            JSONArray pastEventArray= jsonObj.getJSONArray("pastEvents");
                            for(int j=0;j<pastEventArray.length();j++){
                                events.add(new Event(false,1, String.valueOf(pastEventArray.getJSONArray(j).get(0)),pastEventArray.getJSONArray(j).get(1).toString()));
                            }
                            events.add(new Event(false, 2,"0","Interested Events"));
                            jsonObj = new JSONObject(response);;
                            JSONArray interestedEventArray= jsonObj.getJSONArray("interestedEvents");
                            for(int j=0;j<interestedEventArray.length();j++){
                                events.add(new Event(false, 1,String.valueOf(interestedEventArray.getJSONArray(j).get(0)),interestedEventArray.getJSONArray(j).get(1).toString()));
                            }
                            events.add(new Event(false, 2,"0","Created Events"));
                            jsonObj = new JSONObject(response);
                            JSONArray createdEventArray= jsonObj.getJSONArray("createdEvents");
                            for(int j=0;j<createdEventArray.length();j++){
                                if (isMe){
                                    events.add(new Event(true, 1, String.valueOf(createdEventArray.getJSONArray(j).get(0)),createdEventArray.getJSONArray(j).get(1).toString()));
                                }else{
                                    events.add(new Event(false, 1, String.valueOf(createdEventArray.getJSONArray(j).get(0)),createdEventArray.getJSONArray(j).get(1).toString()));
                                }
                            }

                            recyclerView.setAdapter(eventAdapter);
                            eventAdapter.notifyDataSetChanged();

                            // get followers
                            JSONArray followersArray = jsonObj.getJSONArray("followers");
                            for (int i = 0; i < followersArray.length(); i++) {
                                JSONArray array = followersArray.getJSONArray(i);
                                String uid = array.getString(0);
                                followers.add(new User(array.getString(0), array.getString(5), array.getString(1), array.getString(2), array.getString(3)));
                                if (uid.equals(MainActivity.pk)){
                                    isFriend = true;
                                    buttonProfile.setText("Unfollow");
                                }
                            }

                            // get followings
                            JSONArray followingArray = jsonObj.getJSONArray("followedUsers");
                            for (int i = 0; i < followingArray.length(); i++) {
                                JSONArray array = followingArray.getJSONArray(i);
                                followings.add(new User(array.getString(0), array.getString(5), array.getString(1), array.getString(2), array.getString(3)));
                            }

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

    private void follow(int requestType){
        String url = Constants.FOLLOW_USER_URL + userid;
        StringRequest jsonObjReq = new StringRequest(requestType, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(activity, response.substring(1, response.length()-1), Toast.LENGTH_SHORT).show();
                        getProfile(userid);
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

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            userid = getArguments().getString(USER_ID);
        }
    }

    @Override
    public void onClick(View view) {
        int position = recyclerView.getChildLayoutPosition(view);
        switch (tabLayout.getSelectedTabPosition()){
            case 0:
                FragmentTransaction transaction = activity.getSupportFragmentManager().beginTransaction();
                transaction.add(R.id.fragment, EventFragment.newInstance(events.get(position).getId()));
                transaction.addToBackStack("addEF");
                transaction.commit();
                break;
            case 1:
                FragmentTransaction transaction2 = activity.getSupportFragmentManager().beginTransaction();
                transaction2.add(R.id.fragment, ProfileFragment.newInstance(followings.get(position).getId()));
                transaction2.addToBackStack("addPF");
                transaction2.commit();
                break;
            case 2:
                FragmentTransaction transaction3 = activity.getSupportFragmentManager().beginTransaction();
                transaction3.add(R.id.fragment, ProfileFragment.newInstance(followers.get(position).getId()));
                transaction3.addToBackStack("addPF");
                transaction3.commit();
                break;
        }

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
