package com.culturalactivities.robin.models;

import java.util.ArrayList;

public class Event {
    private String id, eventName, eventInfo, artistInfo, date;
    private double price;
    private float rating;
    private Location location;
    private ArrayList<Comment> comments;
    private ArrayList<User> goingUser;
    private ArrayList<Tag> tags;
    private ArrayList<Image> images;

    public Event() {
        eventName = "Event Title";
        images = new ArrayList<>();
    }

    public Event(String eventName, String eventInfo, String artistInfo, String date, double price, float rating, Location location, ArrayList<Comment> comments, ArrayList<User> goingUser, ArrayList<Tag> tags, ArrayList<Image> images) {
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
        this.images = images;
    }

    public Event(String id, String eventName, String eventInfo, String artistInfo, String date, double price, float rating, Location location, ArrayList<Comment> comments, ArrayList<User> goingUser, ArrayList<Tag> tags, ArrayList<Image> images) {
        this.id = id;
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
        this.images = images;
    }

    public Event(String name, String info) {
        this.eventName = name;
        this.eventInfo = info;
        this.artistInfo = "";
        this.date = "";
        this.price = 0;
        this.rating = 0;
        this.location = null;
        this.comments = new ArrayList<>();
        this.goingUser = new ArrayList<>();
        this.tags = new ArrayList<>();
        this.images = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
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

    public ArrayList<Image> getImages() {
        return images;
    }

    public void setImages(ArrayList<Image> images) {
        this.images = images;
    }
}
