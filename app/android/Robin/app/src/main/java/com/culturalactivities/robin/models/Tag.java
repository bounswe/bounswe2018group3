package com.culturalactivities.robin.models;

import java.util.ArrayList;

public class Tag {
    private String name;
    private int numberOfFollowers;
    private ArrayList<Tag> connectedTags;

    public Tag(String name, int numberOfFollowers, ArrayList<Tag> connectedTags) {
        this.name = name;
        this.numberOfFollowers = numberOfFollowers;
        this.connectedTags = connectedTags;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberOfFollowers() {
        return numberOfFollowers;
    }

    public void setNumberOfFollowers(int numberOfFollowers) {
        this.numberOfFollowers = numberOfFollowers;
    }

    public ArrayList<Tag> getConnectedTags() {
        return connectedTags;
    }

    public void setConnectedTags(ArrayList<Tag> connectedTags) {
        this.connectedTags = connectedTags;
    }
}
