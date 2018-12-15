package com.culturalactivities.robin.fragments;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TimePicker;

import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;

import java.util.Calendar;

public class CreateEventFragment extends Fragment {

    private Button buttonSelectDate, buttonSelectHour;
    private DatePickerDialog.OnDateSetListener onDateSetListener;
    private boolean isDateSelected=false, isHourSelected=false;
    private String eventdate="00.00.0000", hour="00:00";

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
        buttonSelectDate= (Button) view.findViewById(R.id.bDatePicker);
        buttonSelectHour= (Button) view.findViewById(R.id.bTimePicker);

        buttonSelectDate.setTypeface(MainActivity.ubuntuRegular);
        buttonSelectHour.setTypeface(MainActivity.ubuntuRegular);

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
                        buttonSelectHour.setTextColor(Color.BLACK);
                        buttonSelectHour.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimaryLigth));
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
                buttonSelectDate.setTextColor(Color.BLACK);
                buttonSelectDate.setBackgroundColor(activity.getResources().getColor(R.color.colorPrimaryLigth));
                isDateSelected = true;
            }
        };
    }
}
