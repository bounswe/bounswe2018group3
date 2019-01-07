package com.culturalactivities.robin.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.culturalactivities.robin.R;
import com.culturalactivities.robin.models.Tag;

import java.util.ArrayList;

public class MyStringAdapter extends RecyclerView.Adapter<MyStringAdapter.ViewHolder> {

    private Context context;
    private ArrayList<Tag> tags;
    private View.OnClickListener onClickListener;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tvTag;
        ViewHolder(View v) {
            super(v);
            tvTag = v.findViewById(R.id.tvTag);

        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    MyStringAdapter(Context context, ArrayList<Tag> tags, View.OnClickListener onClickListener) {
        this.context = context;
        this.tags = tags;
        this.onClickListener = onClickListener;
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public MyStringAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // create a new view
        LayoutInflater inflater =(LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view;
        assert inflater != null;
        view = inflater.inflate(R.layout.simple_textview, parent, false);
        view.setOnClickListener(onClickListener);
        return new ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Tag tag = tags.get(position);
        holder.tvTag.setText(tag.getName());

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        if (tags == null){
            return 0;
        }
        return tags.size();
    }
}