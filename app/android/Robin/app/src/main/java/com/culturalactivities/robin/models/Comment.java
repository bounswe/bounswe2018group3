package com.culturalactivities.robin.models;

public class Comment {
    private User author;
    private String eventId,title;
    private String content, date,id;
    private int rating;

    public Comment(String id, User author, String eventId, String title, String content, String date, int rating) {
        this.id=id;
        this.title=title;
        this.author = author;
        this.eventId = eventId;
        this.content = content;
        this.date = date;
        this.rating = rating;
    }
    public Comment(String id ,String eventId){
        this.eventId=eventId;
        this.id=id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
