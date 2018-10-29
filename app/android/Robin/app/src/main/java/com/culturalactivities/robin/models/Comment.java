package com.culturalactivities.robin.models;

public class Comment {
    private User author;
    private String content, date;
    private int rating;

    public Comment(User author, String content, String date, int rating) {
        this.author = author;
        this.content = content;
        this.date = date;
        this.rating = rating;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
