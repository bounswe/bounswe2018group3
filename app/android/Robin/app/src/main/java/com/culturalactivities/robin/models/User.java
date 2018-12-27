package com.culturalactivities.robin.models;

import java.util.ArrayList;

public class User {
    private String id, email, username, password, name, surname, bio, profileImage, colorSchemeInf;
    private double rating;
    private ArrayList<String> watchingTags, commentList, blockedTags;
    private ArrayList<Event> eventList;
    private ArrayList<User> followedUsers, followingUsers, blockedUsers;

    public User(String id, String email, String username, String password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User(String id, String email, String username,  String name, String surname, String bio, String profileImage, String colorSchemeInf) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.bio = bio;
        this.profileImage = profileImage;
        this.colorSchemeInf = colorSchemeInf;
       // this.rating = rating;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName(){
        return name + " " + surname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
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

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
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
