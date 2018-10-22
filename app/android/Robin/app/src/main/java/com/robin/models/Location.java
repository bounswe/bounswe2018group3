package com.robin.models;

public class Location {
    private String address, referenceLinks, googleMapsLink;

    public Location(String address, String referenceLinks, String googleMapsLink) {
        this.address = address;
        this.referenceLinks = referenceLinks;
        this.googleMapsLink = googleMapsLink;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getReferenceLinks() {
        return referenceLinks;
    }

    public void setReferenceLinks(String referenceLinks) {
        this.referenceLinks = referenceLinks;
    }

    public String getGoogleMapsLink() {
        return googleMapsLink;
    }

    public void setGoogleMapsLink(String googleMapsLink) {
        this.googleMapsLink = googleMapsLink;
    }
}
