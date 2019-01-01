package com.culturalactivities.robin.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

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
import com.culturalactivities.robin.fragments.CreateEventFragment;
import com.culturalactivities.robin.models.Event;
import com.culturalactivities.robin.utilities.Constants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.ViewHolder> {

    private Context context;
    private ArrayList<Event> events;
    private View.OnClickListener onClickListener;
    private int adapterType;
    RequestQueue queue;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView tvName, tvDescription, tvDate, tvArtist, tvPrice;
        public ImageView ivBanner;
        public RatingBar ratingBar;
        public Button buttonEdit, buttonDelete;
        private RecyclerView rvTags;
        ViewHolder(View v) {
            super(v);
            tvName = v.findViewById(R.id.tvName);
            tvArtist = v.findViewById(R.id.tvArtist);
            tvDate = v.findViewById(R.id.tvEventDate);
            ivBanner = v.findViewById(R.id.ivProfile);
            tvDescription = v.findViewById(R.id.tvDescription);
            ratingBar = v.findViewById(R.id.ratingBar);
            tvPrice = v.findViewById(R.id.tvPrice);
            rvTags = v.findViewById(R.id.rvTags);

            buttonDelete = v.findViewById(R.id.buttonDelete);
            buttonEdit = v.findViewById(R.id.buttonEdit);

        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public EventAdapter(Context context, ArrayList<Event> events, View.OnClickListener onClickListener, int adapterType) {
        this.context = context;
        this.events = events;
        this.onClickListener = onClickListener;
        this.adapterType = adapterType;
        queue = Volley.newRequestQueue(context);
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public EventAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // create a new view
        LayoutInflater inflater =(LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view;
        assert inflater != null;

        switch (viewType){
            case 0:
                view = inflater.inflate(R.layout.simple_event, parent, false);
                break;
            case 1:
                view = inflater.inflate(R.layout.simple_user_event, parent, false);
                break;
            case 2:
                view = inflater.inflate(R.layout.simple_title, parent, false);
                break;
                default:
                    view = inflater.inflate(R.layout.simple_event, parent, false);
                    break;
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
        final Event event = events.get(position);
        holder.tvName.setText(event.getEventName());
        holder.tvName.setTypeface(MainActivity.ubuntuBold);
        if (getItemViewType(position) == 1 || getItemViewType(position) == 0 ){
            //holder.tvDate.setText(event.getTime().substring(0,5) +"  " + event.getDate());
            holder.tvDate.setTypeface(MainActivity.ubuntuRegular);
            //Glide.with(context).load(event.getImages().get(0).getUrl()).into(holder.ivBanner);
            holder.tvArtist.setText(event.getArtistInfo());
            holder.tvArtist.setTypeface(MainActivity.ubuntuRegular);

            if (event.isCreated()){
                holder.buttonEdit.setVisibility(View.VISIBLE);
                holder.buttonDelete.setVisibility(View.VISIBLE);

                holder.buttonDelete.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        openAlertDialog(event.getId());
                    }
                });

                holder.buttonEdit.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        FragmentTransaction transaction = ((AppCompatActivity) context).getSupportFragmentManager().beginTransaction();
                        transaction.add(R.id.fragment, CreateEventFragment.newInstance(event.getId()));
                        transaction.addToBackStack("addEEF");
                        transaction.commit();
                    }
                });
            }
        }

        if(getItemViewType(position)==0){
            holder.ratingBar.setRating(event.getRating());
            holder.tvDescription.setText(event.getEventInfo());
            holder.tvDescription.setTypeface(MainActivity.ubuntuItalic);
            holder.tvArtist.setText(event.getArtistInfo());
            holder.tvPrice.setText(event.getPrice() + " ₺");
            holder.tvPrice.setTypeface(MainActivity.ubuntuRegular);
            holder.rvTags.setLayoutManager(new LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false));
            holder.rvTags.setAdapter(new MyStringAdapter(context, event.getTags(), onClickListener));
        }

    }

    private void openAlertDialog(final String eventid) {
        AlertDialog.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder = new AlertDialog.Builder(context, android.R.style.Theme_Material_Dialog_Alert);
        } else {
            builder = new AlertDialog.Builder(context);
        }
        builder.setTitle("Delete event")
                .setMessage("Are you sure you want to delete this event?")
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        deleteEvent(eventid);
                    }
                })
                .setNegativeButton(android.R.string.no, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        // do nothing
                    }
                })
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }

    private void deleteEvent(String id) {
        String url = Constants.DELETE_EVENTS_URL + id;
        StringRequest jsonObjReq = new StringRequest(Request.Method.DELETE,
                url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("INTERESTEDDD", response); // TODO: 01.01.2019 event deletion should be notified to user
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
    public int getItemViewType(int position) {
        return events.get(position).getType();
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return events.size();
    }

}