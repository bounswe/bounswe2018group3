package com.culturalactivities.robin.activities;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.utilities.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class RegisterActivity extends AppCompatActivity implements View.OnClickListener {

    RequestQueue queue;
    private EditText etUsername, etEmail, etPassword1, etPassword2;
    private String username, email, password1, password2;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        setVariables();
    }

    private void setVariables() {
        queue = Volley.newRequestQueue(this);
        progressDialog = new ProgressDialog(this);

        etUsername = (EditText) findViewById(R.id.etUsername);
        etEmail = (EditText) findViewById(R.id.etEmail);
        etPassword1 = (EditText) findViewById(R.id.etPassword1);
        etPassword2 = (EditText) findViewById(R.id.etPassword2);

        TextView tvLogin = (TextView) findViewById(R.id.tvLogin);
        Button buttonRegister = (Button) findViewById(R.id.buttonRegister);

        tvLogin.setOnClickListener(this);
        //tvLogin.setTypeface(MainActivity.ubuntuRegular);
        buttonRegister.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.tvLogin){
            onBackPressed();
        }else if (v.getId() == R.id.buttonRegister){
            registerUser();
        }
    }

    private void registerUser() {
        username = etUsername.getText().toString().trim();
        email = etEmail.getText().toString().trim();
        password1 = etPassword1.getText().toString();
        password2 = etPassword2.getText().toString();


        if (TextUtils.isEmpty(username)){
            // email is empty
            Toast.makeText(this, this.getString(R.string.please_enter_username), Toast.LENGTH_SHORT).show();
            return;
        }
        if (TextUtils.isEmpty(email)){
            // email is empty
            Toast.makeText(this, this.getString(R.string.please_enter_email), Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(password1)){
            // password1 is empty
            Toast.makeText(this, this.getString(R.string.please_enter_password), Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password1.equals(password2)){
            Toast.makeText(this, this.getString(R.string.please_enter_password_again_correctly), Toast.LENGTH_SHORT).show();
            return;
        }

        if (password1.length() < 8){
            Toast.makeText(this, "Password must be longer than 8 characters", Toast.LENGTH_SHORT).show();
            return;
        }

        progressDialog.setMessage(this.getString(R.string.account_is_being_created));
        progressDialog.show();

        createUser();
    }

    public void createUser(){
        StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                Constants.REGISTER_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        progressDialog.dismiss();
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            Toast.makeText(RegisterActivity.this, jsonObject.getString("detail"), Toast.LENGTH_LONG).show();
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
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", username);
                params.put("email", email);
                params.put("password1", password1);
                params.put("password2", password2);
                params.put("Content-Type", "application/json; charset=utf-8");
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }

}
