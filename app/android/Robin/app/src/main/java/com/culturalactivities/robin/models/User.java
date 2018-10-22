package com.culturalactivities.robin.models;

import java.util.ArrayList;

public class User {
    private String email, username, password, name, bio, profilePhoto, colorSchemeInf;
    private double rating;
    private ArrayList<String> watchingTags, commentList, blockedTags;
    private ArrayList<Event> eventList;
    private ArrayList<User> followedUsers, followingUsers, blockedUsers;

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getColorSchemeInf() {
        return colorSchemeInf;
    }

    public void setColorSchemeInf(String colorSchemeInf) {
        this.colorSchemeInf = colorSchemeInf;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public ArrayList<String> getWatchingTags() {
        return watchingTags;
    }

    public void setWatchingTags(ArrayList<String> watchingTags) {
        this.watchingTags = watchingTags;
    }

    public ArrayList<String> getCommentList() {
        return commentList;
    }

    public void setCommentList(ArrayList<String> commentList) {
        this.commentList = commentList;
    }

    public ArrayList<String> getBlockedTags() {
        return blockedTags;
    }

    public void setBlockedTags(ArrayList<String> blockedTags) {
        this.blockedTags = blockedTags;
    }

    public ArrayList<Event> getEventList() {
        return eventList;
    }

    public void setEventList(ArrayList<Event> eventList) {
        this.eventList = eventList;
    }

    public ArrayList<User> getFollowedUsers() {
        return followedUsers;
    }

    public void setFollowedUsers(ArrayList<User> followedUsers) {
        this.followedUsers = followedUsers;
    }

    public ArrayList<User> getFollowingUsers() {
        return followingUsers;
    }

    public void setFollowingUsers(ArrayList<User> followingUsers) {
        this.followingUsers = followingUsers;
    }

    public ArrayList<User> getBlockedUsers() {
        return blockedUsers;
    }

    public void setBlockedUsers(ArrayList<User> blockedUsers) {
        this.blockedUsers = blockedUsers;
    }
}
