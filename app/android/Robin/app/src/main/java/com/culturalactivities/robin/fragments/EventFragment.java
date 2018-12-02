package com.culturalactivities.robin.fragments;

import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.transition.TransitionInflater;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.adapters.CommentAdapter;
import com.culturalactivities.robin.adapters.ImageAdapter;
import com.culturalactivities.robin.models.Comment;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.models.User;

import java.util.ArrayList;


public class EventFragment extends Fragment implements View.OnClickListener {

    private Event event;
    private ImageView ivBanner;
    private TextView tvTitle, tvDescription, tvOrganizer, tvPrice;
    private RatingBar rbEvent;


    //comments part
    private RecyclerView recyclerView;
    private CommentAdapter commentAdapter;
    private ArrayList<Comment> comments = new ArrayList<>();


    // image gallery
    private RecyclerView rvGallery;
    private ImageAdapter imageAdapter;


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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_event, container, false);
        setView(view);
        return view;
    }

    private void setView(View view) {
        activity.getSupportActionBar().setSubtitle(event.getEventName());
        ivBanner = view.findViewById(R.id.ivProfile);
        tvTitle = view.findViewById(R.id.tvTitle);
        tvOrganizer = view.findViewById(R.id.tvOrganizer);
        tvPrice = view.findViewById(R.id.tvPrice);
        tvDescription = view.findViewById(R.id.tvDescription);
        rbEvent = view.findViewById(R.id.rbEvent);

        Glide.with(view).load(event.getImages().get(0).getUrl()).into(ivBanner);
        tvTitle.setText(event.getEventName());
        tvDescription.setText(event.getEventInfo());
        rbEvent.setRating(3);
        tvOrganizer.setText("MFÖ");
        tvPrice.setText("50 ₺");
        
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
    }

    private void getComments() {
        comments.clear();
        User user = new User("test@test.com", "Tester", "password");
        user.setName("Nazan Karaman");
        Comment comment = new Comment(user, getString(R.string.lorem_ipsum_base), "7 September 2018", 4);
        comments.add(comment);
        User user2 = new User("test@test.com", "Tester", "pass");
        user2.setName("Adnan Demir");
        Comment comment2 = new Comment(user2, getString(R.string.lorem_ipsum_content), "5 April 2018", 3);
        comments.add(comment2);
        commentAdapter.notifyDataSetChanged();
    }

    @Override
    public void onClick(View view) {

    }
}
