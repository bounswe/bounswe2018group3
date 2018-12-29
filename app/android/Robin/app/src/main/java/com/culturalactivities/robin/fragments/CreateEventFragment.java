package com.culturalactivities.robin.fragments;

import android.Manifest;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.ProgressDialog;
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
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.ui.PlacePicker;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.view.View;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CreateEventFragment extends Fragment {
    RequestQueue queue;
    private Button buttonSelectDate, buttonSelectHour, buttonSelectLocation,buttonCreate;
    private DatePickerDialog.OnDateSetListener onDateSetListener;
    private boolean isDateSelected=false, isHourSelected=false;
    private String eventdate="00.00.0000", hour="00:00";
    private static final int GALLERY_INTENT = 21, PLACE_PICKER_INTENT=22;

    private Spinner spinnerCurrencies;
    private EditText etTitle, etArtist, etDescription, etPrice, etLatitude, etLongitude, etTags;
    private ImageView ivEvent;
    private String EVENTS_URL = "http://139.59.128.92:8080/api/v1/events/";
    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }
    public CreateEventFragment() {
        // Required empty public constructor
    }

    public static CreateEventFragment newInstance() {
        return new CreateEventFragment();
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
        activity.getSupportActionBar().setSubtitle("Create Event");
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
        buttonCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               createEvent();
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

                eventdate = day + "." + month + "." + y;
                buttonSelectDate.setText(eventdate);
                //buttonSelectDate.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimaryLigth));
                isDateSelected = true;
            }
        };

        etTitle = view.findViewById(R.id.etTitle);
        etArtist = view.findViewById(R.id.etArtist);
        etDescription = view.findViewById(R.id.etDescription);
        etPrice = view.findViewById(R.id.etPrice);
        //etLatitude = view.findViewById(R.id.etLatitude);
        //etLongitude = view.findViewById(R.id.etLongitude);
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

        List<String> currencies = Arrays.asList(activity.getResources().getStringArray(R.array.currencies));

        spinnerCurrencies.setAdapter(new ArrayAdapter<String>(activity, android.R.layout.simple_list_item_1, currencies));
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
        final StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                EVENTS_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject jsonObject = new JSONObject(response);
                            jsonObject.put("name", etTitle.getText().toString().trim());
                            jsonObject.put("info", etDescription.getText().toString().trim());
                            jsonObject.put("artist", etArtist.getText().toString().trim());
                            jsonObject.put("price", etPrice.getText().toString().trim());
                            jsonObject.put("tags", new JSONArray("[]"));
                            jsonObject.put("ratings", new JSONArray("[]"));
                            jsonObject.put("comments", new JSONArray("[]"));
                            jsonObject.put("images", new JSONArray("[]"));

                            Toast.makeText(activity, jsonObject.getString("detail"), Toast.LENGTH_LONG).show();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
            }
        }) {

            /*@Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", etTitle.getText().toString().trim());
                params.put("info", etDescription.getText().toString().trim());
                params.put("artist", etArtist.getText().toString().trim());
                params.put("price", etPrice.getText().toString().trim());
                return params;
            }*/
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Content-Type", "application/json");
                params.put("Authorization", "JWT " + MainActivity.token);
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }
}
