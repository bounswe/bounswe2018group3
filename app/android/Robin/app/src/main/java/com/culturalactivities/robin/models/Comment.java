package com.culturalactivities.robin.models;

public class Comment {
    private User author;
    private String content, date;
    private double price;

    public Comment(User author, String content, String date, double price) {
        this.author = author;
        this.content = content;
        this.date = date;
        this.price = price;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
