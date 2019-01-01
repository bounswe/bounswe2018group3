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

import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.models.Comment;

import java.util.ArrayList;

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.ViewHolder> {

    private Context context;
    private ArrayList<Comment> comments;
    private View.OnClickListener onClickListener;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        TextView tvAuthor, tvComment, tvDate, tvTitle;
        RatingBar rbComment;
        ImageView ivAuthor;
        ViewHolder(View v) {
            super(v);
            tvAuthor = v.findViewById(R.id.tvAuthor);
            tvTitle = v.findViewById(R.id.tvTitle);
            tvComment = v.findViewById(R.id.tvComment);
            tvDate = v.findViewById(R.id.tvDate);
            rbComment = v.findViewById(R.id.rbComment);
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public CommentAdapter(Context context, ArrayList<Comment> comments, View.OnClickListener onClickListener) {
        this.context = context;
        this.comments = comments;
        this.onClickListener = onClickListener;
    }

    // Create new views (invoked by the layout manager)
    @NonNull
    @Override
    public CommentAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // create a new view
        LayoutInflater inflater =(LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view;
        assert inflater != null;
        view = inflater.inflate(R.layout.simple_comment, parent, false);
        view.setOnClickListener(onClickListener);
        return new CommentAdapter.ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull CommentAdapter.ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Comment comment = comments.get(position);
        holder.tvAuthor.setText(comment.getAuthor().getUsername());
        holder.tvTitle.setText(comment.getTitle());
        holder.tvComment.setText(comment.getContent());
        holder.tvDate.setText(comment.getDate());
        holder.rbComment.setRating(comment.getRating());
        holder.tvAuthor.setTypeface(MainActivity.ubuntuRegular);
        holder.tvTitle.setTypeface(MainActivity.ubuntuBold);
        holder.tvComment.setTypeface(MainActivity.ubuntuItalic);
        holder.tvDate.setTypeface(MainActivity.ubuntuRegular);
        //Glide.with(context).load(event.getImages().get(0).getUrl()).into(holder.ivBanner);

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return comments.size();
    }
}