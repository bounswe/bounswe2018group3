package com.culturalactivities.robin.models;

import java.util.ArrayList;

public class Event {
    private String eventName, eventInfo, artistInfo, date;
    private double price, rating;
    private Location location;
    private ArrayList<Comment> comments;
    private ArrayList<User> goingUser;
    private ArrayList<Tag> tags;
    private ArrayList<Image> imageUrls;

    public Event() {
        eventName = "Event Title";
        imageUrls = new ArrayList<>();
    }

    public Event(String eventName, String eventInfo, String artistInfo, String date, double price, double rating, Location location, ArrayList<Comment> comments, ArrayList<User> goingUser, ArrayList<Tag> tags, ArrayList<Image> imageUrls) {
        this.eventName = eventName;
        this.eventInfo = eventInfo;
        this.artistInfo = artistInfo;
        this.date = date;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.comments = comments;
        this.goingUser = goingUser;
        this.tags = tags;
        this.imageUrls = imageUrls;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventInfo() {
        return eventInfo;
    }

    public void setEventInfo(String eventInfo) {
        this.eventInfo = eventInfo;
    }

    public String getArtistInfo() {
        return artistInfo;
    }

    public void setArtistInfo(String artistInfo) {
        this.artistInfo = artistInfo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public ArrayList<User> getGoingUser() {
        return goingUser;
    }

    public void setGoingUser(ArrayList<User> goingUser) {
        this.goingUser = goingUser;
    }

    public ArrayList<Tag> getTags() {
        return tags;
    }

    public void setTags(ArrayList<Tag> tags) {
        this.tags = tags;
    }

    public ArrayList<Image> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(ArrayList<Image> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
