package com.culturalactivities.robin.fragments;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.activities.MainActivity;
import com.culturalactivities.robin.utilities.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;


public class EditProfileFragment extends Fragment {


    RequestQueue queue;
    private ImageView ivProfile;
    private EditText etName, etSurname, etBio;

    private static final int GALLERY_INTENT = 21;

    private AppCompatActivity activity;
    @Override
    public void onAttach(Context context) {
        activity = (AppCompatActivity) context;
        super.onAttach(context);
    }


    private OnFragmentInteractionListener mListener;

    public EditProfileFragment() {
        // Required empty public constructor
    }

    public static EditProfileFragment newInstance() {
        EditProfileFragment fragment = new EditProfileFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_edit_profile, container, false);
        setView(view);
        return view;
    }

    private void setView(View view) {
        queue = Volley.newRequestQueue(activity);
        ivProfile = view.findViewById(R.id.ivProfile);
        etName = view.findViewById(R.id.etName);
        etSurname = view.findViewById(R.id.etSurname);
        etBio = view.findViewById(R.id.etBio);

        getProfileInfo();

        ivProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isStoragePermissionGranted()){
                    Intent intent = new Intent(Intent.ACTION_PICK);
                    intent.setType("image/");
                    startActivityForResult(intent, GALLERY_INTENT);
                }
            }
        });
    }

    private void getProfileInfo() {
        String UURL = Constants.USERS_URL + MainActivity.pk;
        MainActivity.progressBar.setVisibility(View.VISIBLE);
        StringRequest jsonObjReq = new StringRequest(Request.Method.GET,
                UURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            String username = toUTF(jsonObject.getString("username"));
                            String fname = toUTF(jsonObject.getString("first_name"));
                            String lname = toUTF(jsonObject.getString("last_name"));
                            String bio = toUTF(jsonObject.getString("bio"));
                            String image = jsonObject.getString("profile_pic");

                            etName.setText(fname);
                            etSurname.setText(lname);
                            //Glide.with(activity).load(image).into(ivProfile);
                            // TODO: 05.12.2018 Waiting for profile picture link from backend
                            etBio.setText(bio);
                            MainActivity.progressBar.setVisibility(View.INVISIBLE);

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
                Map<String, String> params = new HashMap<String, String>();
                params.put("type", "post");
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
        if (requestCode == GALLERY_INTENT) {

            if (resultCode== Activity.RESULT_OK){
                Uri uri = data.getData();
                try {
                    Bitmap bitmap = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), uri);
                    ivProfile.setImageBitmap(bitmap);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }else {
                isStoragePermissionGranted();
            }
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

    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        void onFragmentInteraction(Uri uri);
    }
    public String toUTF(String str){
        try {
            byte ptext[] = str.getBytes("ISO-8859-1");
            str = new String(ptext, "UTF-8");
        }catch(UnsupportedEncodingException ex){

        }
        return str;
    }
}
