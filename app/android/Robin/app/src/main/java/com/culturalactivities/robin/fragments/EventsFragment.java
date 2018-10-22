package com.culturalactivities.robin.fragments;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.culturalactivities.robin.R;
import com.culturalactivities.robin.adapters.EventAdapter;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.Image;

import java.util.ArrayList;

/**
 * A simple {@link Fragment} subclass.
 */
public class EventsFragment extends Fragment {


    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private ArrayList<Event> events = new ArrayList<>();


    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }

    public EventsFragment() {}

    public static EventsFragment newInstance(){
        EventsFragment fragment = new EventsFragment();
        return fragment;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_events, container, false);
        setView(view);
        return view;
    }

    private void setView(View view) {
        recyclerView = view.findViewById(R.id.rvEvents);
        eventAdapter = new EventAdapter(activity, events);
        recyclerView.setLayoutManager(new LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(eventAdapter);
        getEvents();
    }

    private void getEvents() {
        events.clear();
        Image image = new Image("https://cappadociaballoonflights.com/blog/img/cappadocia%20balloon%20ride.JPG", null);
        ArrayList<Image> images = new ArrayList<>();
        images.add(image);
        for (int i = 0; i < 3; i++) {
            Event event = new Event();
            event.setImageUrls(images);
            event.setEventInfo("MY Event description");
            events.add(event);
        }
        eventAdapter.notifyDataSetChanged();
    }
}
