package com.culturalactivities.robin.fragments;

import android.Manifest;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TimePicker;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.ServerError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.utilities.Constants;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlacePicker;
import com.google.android.gms.maps.model.LatLng;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CreateEventFragment extends Fragment {

    private String eventid;
    private boolean isEditMod = false;
    RequestQueue queue;
    private Button buttonSelectDate, buttonSelectHour, buttonSelectLocation, buttonCreate;
    private DatePickerDialog.OnDateSetListener onDateSetListener;
    private boolean isDateSelected=false, isHourSelected=false;
    private String eventdate="00.00.0000", hour="00:00";
    private static final int GALLERY_INTENT = 21, PLACE_PICKER_INTENT=22;

    private Spinner spinnerCurrencies;
    private EditText etTitle, etArtist, etDescription, etPrice, etLatitude, etLongitude, etTags;
    private ImageView ivEvent;
    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }
    public CreateEventFragment() {
        // Required empty public constructor
    }

    public static CreateEventFragment newInstance(String eventid) {
        CreateEventFragment fragment = new CreateEventFragment();
        fragment.setEvent(eventid);
        return fragment;
    }

    private void setEvent(String eventid){
        this.eventid = eventid;
        if (eventid != null){
            isEditMod = true;
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        menu.clear();
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_create_event, container, false);
        setView(view);
        return view;
    }

    private void setView(View view) {
        MainActivity.progressBar.setVisibility(View.INVISIBLE);
        //reference = new Reference();
        queue = Volley.newRequestQueue(activity);
        buttonSelectDate= (Button) view.findViewById(R.id.bDatePicker);
        buttonSelectHour= (Button) view.findViewById(R.id.bTimePicker);

        buttonSelectDate.setTypeface(MainActivity.ubuntuRegular);
        buttonSelectHour.setTypeface(MainActivity.ubuntuRegular);
        /*buttonSelectLocation.setTypeface(MainActivity.ubuntuRegular);

        buttonSelectLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isLocationPermissionGranted()){
                    selectLocation();
                }
            }
        });*/

        buttonSelectDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar calendar = Calendar.getInstance();
                int year = calendar.get(Calendar.YEAR);
                int month = calendar.get(Calendar.MONTH);
                int day = calendar.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog dialog = new DatePickerDialog(activity,
                        android.R.style.Theme_Holo_Light_Dialog_MinWidth,
                        onDateSetListener,
                        year, month, day);
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

                dialog.setButton(DatePickerDialog.BUTTON_POSITIVE, "Select", dialog);
                dialog.setButton(DatePickerDialog.BUTTON_NEGATIVE, "Cancel", dialog);
                dialog.show();
            }
        });
        buttonCreate = view.findViewById(R.id.buttonCreate);
        if (isEditMod){
            buttonCreate.setText("Save Changes");
        }else {
            buttonCreate.setText("Create Event");
        }
        buttonCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isEditMod){
                    editEvent();
                }else {
                    createEvent();
                }
            }
        });
        buttonSelectHour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar mcurrentTime = Calendar.getInstance();//
                final int h = mcurrentTime.get(Calendar.HOUR_OF_DAY);//Güncel saati aldık
                int minute = mcurrentTime.get(Calendar.MINUTE);//Güncel dakikayı aldık
                TimePickerDialog timePicker; //Time Picker referansımızı oluşturduk

                //TimePicker objemizi oluşturuyor ve click listener ekliyoruz
                timePicker = new TimePickerDialog(activity, new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                        String hod;
                        if (hourOfDay < 10){
                            hod = "0" + hourOfDay;
                        }else {
                            hod = "" + hourOfDay;
                        }
                        String m;
                        if (minute < 10){
                            m = "0" + minute;
                        }else {
                            m = "" + minute;
                        }

                        isHourSelected = true;
                        hour = hod + ":" + m;
                        buttonSelectHour.setText(hour);
                        //buttonSelectHour.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimaryLigth));
                    }

                }, h, minute, true);//true 24 saatli sistem için
                timePicker.setButton(TimePickerDialog.BUTTON_POSITIVE, "Select", timePicker);
                timePicker.setButton(TimePickerDialog.BUTTON_NEGATIVE, "Cancel", timePicker);
                timePicker.show();
            }
        });

        onDateSetListener = new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int y, int m, int d) {
                m++;
                String month, day;

                if (m < 10){
                    month = "0" + m;
                }else {
                    month = "" + m;
                }

                if (d < 10){
                    day = "0" + d;
                }else {
                    day = "" + d;
                }

                eventdate = y + "-" + month + "-" + day;
                buttonSelectDate.setText(eventdate);
                //buttonSelectDate.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimaryLigth));
                isDateSelected = true;
            }
        };

        etTitle = view.findViewById(R.id.etTitle);
        etArtist = view.findViewById(R.id.etArtist);
        etDescription = view.findViewById(R.id.etDescription);
        etPrice = view.findViewById(R.id.etPrice);
        etLatitude = view.findViewById(R.id.etLatitude);
        etLongitude = view.findViewById(R.id.etLongitude);
        etTags = view.findViewById(R.id.etTags);
        spinnerCurrencies = view.findViewById(R.id.spinnerCurrencies);
        ivEvent = view.findViewById(R.id.ivEvent);
        ivEvent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isStoragePermissionGranted()){
                    Intent intent = new Intent(Intent.ACTION_PICK);
                    intent.setType("image/");
                    startActivityForResult(intent, GALLERY_INTENT);
                }
            }
        });


        // fill event data if event mode
        if (isEditMod){
            getEventDetails();
        }

        List<String> currencies = Arrays.asList(activity.getResources().getStringArray(R.array.currencies));

        spinnerCurrencies.setAdapter(new ArrayAdapter<String>(activity, android.R.layout.simple_list_item_1, currencies));
    }

    private void getEventDetails() {
        String url = Constants.EVENTS_URL + eventid;
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        JSONObject jsonObject = null;
                        try {
                            jsonObject = new JSONObject(response);
                            String id = toUTF(jsonObject.getString("id"));
                            String name = toUTF(jsonObject.getString("name"));
                            String info = toUTF(jsonObject.getString("info"));
                            String artist = toUTF(jsonObject.getString("artist"));
                            String date = toUTF(jsonObject.getString("date"));
                            String time = toUTF(jsonObject.getString("time"));
                            String price = toUTF(jsonObject.getString("price"));
                            Float rating = Float.valueOf(jsonObject.getString("rating"));
                            String lat = toUTF(jsonObject.getString("rating"));
                            String lon = toUTF(jsonObject.getString("rating"));

                            etTitle.setText(name);
                            etArtist.setText(artist);
                            etDescription.setText(info);
                            etLatitude.setText(lat);
                            etLongitude.setText(lon);
                            etPrice.setText(price);
                            buttonSelectDate.setText(date);
                            if(time.length()>4){
                                buttonSelectHour.setText(time.substring(0,5));
                            }
                            else{
                                buttonSelectHour.setText(time);
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                params.put("Content-Type", "application/json");
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }

    private void editEvent() {
        String EDIT_URL=Constants.EDIT_EVENTS_URL+eventid;
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        final StringRequest jsonObjReq = new StringRequest(Request.Method.PATCH,
                EDIT_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        MainActivity.progressBar.setVisibility(View.INVISIBLE);
                        //Toast.makeText(activity, response, Toast.LENGTH_SHORT).show();
                        Toast.makeText(activity, "Your event is updated.", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", etTitle.getText().toString().trim());
                params.put("location", "location");
                params.put("info", etDescription.getText().toString());
                params.put("loc_lattitude", etLatitude.getText().toString());
                params.put("loc_longitude", etLongitude.getText().toString());
                params.put("city", "");
                params.put("country", "");
                params.put("artist", etArtist.getText().toString().trim());
                params.put("date", buttonSelectDate.getText().toString().trim());
                params.put("time", buttonSelectHour.getText().toString().trim());
                params.put("price", etPrice.getText().toString().trim());

                ArrayList<Integer> arrayList = new ArrayList<>();
                /*Gson gson = new Gson();

                String myarray = gson.toJson(arrayList);
                params.put("tags", myarray);
                params.put("ratings", myarray);
                params.put("comments", myarray);
                params.put("images", myarray);*/

                Log.d("CREATE PARAMS", params.toString());
                return params;
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == GALLERY_INTENT && grantResults[0] == PackageManager.PERMISSION_GRANTED){
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setType("image/");
            startActivityForResult(intent, GALLERY_INTENT);
        }else {
            Toast.makeText(activity, "Please select an image!", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode== Activity.RESULT_OK && requestCode==GALLERY_INTENT){
            Uri uri = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), uri);
                ivEvent.setImageBitmap(bitmap);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else if (resultCode== Activity.RESULT_OK && requestCode==PLACE_PICKER_INTENT){
            Place place = PlacePicker.getPlace(data, activity);
            LatLng latLng = place.getLatLng();
            Toast.makeText(activity, latLng.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    public boolean isStoragePermissionGranted() {
        if (Build.VERSION.SDK_INT >= 23) {
            if (activity.checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
                    == PackageManager.PERMISSION_GRANTED) {
                return true;
            } else {
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
                return false;
            }
        }
        else { //permission is automatically granted on sdk<23 upon installation
            return true;
        }
    }
    public boolean isLocationPermissionGranted() {
        if (Build.VERSION.SDK_INT >= 23) {
            if (activity.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {
                return true;
            } else {
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 2);
                return false;
            }
        }
        else { //permission is automatically granted on sdk<23 upon installation
            return true;
        }
    }

    private void selectLocation(){
        PlacePicker.IntentBuilder intentBuilder = new PlacePicker.IntentBuilder();

        Intent intent;
        try {
            intent = intentBuilder.build(activity);
            startActivityForResult(intent, PLACE_PICKER_INTENT);
        } catch (GooglePlayServicesRepairableException e) {
            e.printStackTrace();
        } catch (GooglePlayServicesNotAvailableException e) {
            e.printStackTrace();
        }
    }

    public void createEvent(){
        if (!isDateSelected){
            Toast.makeText(activity, "Please select date!", Toast.LENGTH_SHORT).show();
            return;
        }
        if (!isHourSelected){
            Toast.makeText(activity, "Please select hour!", Toast.LENGTH_SHORT).show();
            return;
        }
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        final StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                Constants.EVENTS_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        MainActivity.progressBar.setVisibility(View.INVISIBLE);
                        //Toast.makeText(activity, response, Toast.LENGTH_SHORT).show();
                        Toast.makeText(activity, "Your event is created.", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                // As of f605da3 the following should work
                NetworkResponse response = error.networkResponse;
                if (error instanceof ServerError && response != null) {
                    /*try {
                        String res = new String(response.data,
                                HttpHeaderParser.parseCharset(response.headers, "utf-8"));
                        // Now you can use any deserializer to make sense of data
                        Log.d("RESSOO", res);
                        JSONObject obj = new JSONObject(res);
                        String[] temp=new String[1];
                        obj.put("tags", new JSONArray(Arrays.asList( temp)));
                        obj.put("ratings", new JSONArray(Arrays.asList( temp)));
                        obj.put("comments", new JSONArray(Arrays.asList( temp)));
                        obj.put("images", new JSONArray(Arrays.asList( temp)));
                    } catch (UnsupportedEncodingException e1) {
                        // Couldn't properly decode data to string
                        e1.printStackTrace();
                    } catch (JSONException e2) {
                        // returned data is not JSONObject?
                        e2.printStackTrace();
                    }*/
                }
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", etTitle.getText().toString().trim());
                params.put("location", "location");
                params.put("info", etDescription.getText().toString());
                params.put("loc_lattitude", etLatitude.getText().toString());
                params.put("loc_longitude", etLongitude.getText().toString());
                params.put("city", "");
                params.put("country", "");
                params.put("artist", etArtist.getText().toString().trim());
                params.put("date", buttonSelectDate.getText().toString().trim());
                params.put("time", buttonSelectHour.getText().toString().trim());
                params.put("price", etPrice.getText().toString().trim());

                ArrayList<Integer> arrayList = new ArrayList<>();
                Gson gson = new Gson();

                //String myarray = gson.toJson(arrayList);

                Log.d("CREATE PARAMS", params.toString());
                return params;
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }

    public String toUTF(String str){
        try {
            byte ptext[] = str.getBytes("ISO-8859-1");
            str = new String(ptext, "UTF-8");
        }catch(UnsupportedEncodingException ignored){

        }
        return str;
    }
}
