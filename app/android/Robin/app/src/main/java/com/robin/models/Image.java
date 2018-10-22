package com.robin.models;

import java.util.ArrayList;

public class Image {
    private String url;
    private ArrayList<Annotation> annotations;

    public Image(String url, ArrayList<Annotation> annotations) {
        this.url = url;
        this.annotations = annotations;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ArrayList<Annotation> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(ArrayList<Annotation> annotations) {
        this.annotations = annotations;
    }
}
