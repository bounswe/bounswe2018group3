package com.culturalactivities.robin.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.models.Event;

import java.util.ArrayList;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.ViewHolder> {

    private Context context;
    private ArrayList<Event> events;
    private View.OnClickListener onClickListener;
    private int adapterType;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView tvName, tvDescription, tvDate, tvArtist;
        public ImageView ivBanner;
        public RatingBar ratingBar;
        ViewHolder(View v) {
            super(v);
            tvName = v.findViewById(R.id.tvEventName);
            tvArtist = v.findViewById(R.id.tvArtistName);
            tvDate = v.findViewById(R.id.tvEventDate);
            ivBanner = v.findViewById(R.id.ivBanner);
            tvDescription = v.findViewById(R.id.tvDescription);
            ratingBar = v.findViewById(R.id.ratingBar);

        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public EventAdapter(Context context, ArrayList<Event> events, View.OnClickListener onClickListener, int adapterType) {
        this.context = context;
        this.events = events;
        this.onClickListener = onClickListener;
        this.adapterType = adapterType;
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public EventAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // create a new view
        LayoutInflater inflater =(LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view;
        assert inflater != null;
        if(adapterType==0){

            view = inflater.inflate(R.layout.simple_event, parent, false);
        }else{
            view = inflater.inflate(R.layout.simple_user_event, parent, false);

        }
        view.setOnClickListener(onClickListener);
        return new ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Event event = events.get(position);
        holder.tvName.setText(event.getEventName());
        holder.tvName.setTypeface(MainActivity.ubuntuRegular);
        //Glide.with(context).load(event.getImages().get(0).getUrl()).into(holder.ivBanner);

        if(adapterType==0){
            holder.ratingBar.setRating(event.getRating());
            holder.tvDescription.setTypeface(MainActivity.ubuntuRegular);
            holder.tvDescription.setText(event.getEventInfo());
        }else{
            holder.tvDate.setText(event.getDate());
            holder.tvArtist.setText(event.getArtistInfo());
        }

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return events.size();
    }

}