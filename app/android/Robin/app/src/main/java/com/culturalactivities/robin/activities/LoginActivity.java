package com.culturalactivities.robin.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
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

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText etEmail, etPassword;
    private Button buttonLogin, buttonFacebook;
    private TextView tvRegister, tvForgotPassword, tvGuestUser;

    RequestQueue queue;
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        setView();
    }

    private void setView() {
        queue = Volley.newRequestQueue(this);
        preferences = getSharedPreferences("login", MODE_PRIVATE);
        String token = preferences.getString("token", null);

        if (token != null){
            String pk = preferences.getString("pk", null);
            String username = preferences.getString("username", null);
            String email = preferences.getString("email", null);
            openMainActivity(token, pk, username, email,false);
        }

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);

        tvGuestUser = findViewById(R.id.tvGuestUser);

        buttonLogin = findViewById(R.id.buttonLogin);
        buttonFacebook = findViewById(R.id.buttonFacebook);

        buttonLogin.setOnClickListener(this);
        buttonFacebook.setOnClickListener(this);

        tvRegister = findViewById(R.id.tvRegister);
        tvForgotPassword = findViewById(R.id.tvForgotPassword);

        tvRegister.setOnClickListener(this);
        tvForgotPassword.setOnClickListener(this);
        tvGuestUser.setOnClickListener(this);
    }

    private void openMainActivity(String token, String pk, String username, String email,boolean isGuest){
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        intent.putExtra("token", token);
        intent.putExtra("pk", pk);
        intent.putExtra("username", username);
        intent.putExtra("email", email);
        intent.putExtra("isGuest",isGuest);
        startActivity(intent);
        if(!isGuest){
            finish();
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.buttonLogin:
                login();
                break;
            case R.id.buttonFacebook:
                break;
            case R.id.tvRegister:
                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
                break;
            case R.id.tvForgotPassword:
                //login();
                break;
            case R.id.tvGuestUser:
                openMainActivity(null,null,null,null,true);
                break;
        }
    }

    private void login() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (!isValidEmail(email)){
            Toast.makeText(this, "Email is not valid", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(password)){
            Toast.makeText(this, "Password can not be empty", Toast.LENGTH_SHORT).show();
            return;
        }

        loginRequest(email, password);
    }

    public void loginRequest(final String email, final String password){
        StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                Constants.LOGIN_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            String token = jsonObject.getString("token");
                            JSONObject jsonUser = jsonObject.getJSONObject("user");
                            String pk = jsonUser.getString("pk");
                            String username = jsonUser.getString("username");
                            String email = jsonUser.getString("email");

                            Log.d("TOKEE", token);
                            preferences.edit().putString("token", token).apply();
                            preferences.edit().putString("pk", pk).apply();
                            preferences.edit().putString("username", username).apply();
                            preferences.edit().putString("email", email).apply();

                            openMainActivity(token, pk, username, email,false);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                //Toast.makeText(LoginActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                Toast.makeText(LoginActivity.this, "Not authorized!", Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("email", email);
                params.put("password", password);
                params.put("Content-Type", "application/json; charset=utf-8");
                return params;
            }
        };
        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);
    }
    public final static boolean isValidEmail(CharSequence target) {
        return !TextUtils.isEmpty(target) && android.util.Patterns.EMAIL_ADDRESS.matcher(target).matches();
    }
}
