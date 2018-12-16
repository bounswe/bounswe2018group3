package com.culturalactivities.robin.activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Base64;
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
import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.Profile;
import com.facebook.ProfileTracker;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import org.json.JSONException;
import org.json.JSONObject;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    private CallbackManager callbackManager;
    public static  AccessTokenTracker accessTokenTracker;
    public static  ProfileTracker profileTracker;

    private EditText etEmail, etPassword;
    private Button buttonLogin;
    private LoginButton facebookLogin;
    private TextView tvRegister, tvForgotPassword, tvGuestUser;

    RequestQueue queue;
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        setContentView(R.layout.activity_login);
        setView();
    }

    private void setView() {
        queue = Volley.newRequestQueue(this);
        callbackManager = CallbackManager.Factory.create();

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
        facebookLogin = findViewById(R.id.buttonFacebook);

        //facebookLogin.setReadPermissions(Arrays.asList("public_profile", "email", "user_birthday", "user_friends"));
        facebookLogin.setReadPermissions(Arrays.asList("public_profile", "email"));
        facebookLogin.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Profile profile = Profile.getCurrentProfile();
                if (profile != null){
                    //loginWithFacebook(profile.getId(), profile.getFirstName(), profile.getLastName(), String.valueOf(profile.getProfilePictureUri(300, 300)));
                }
            }

            @Override
            public void onCancel() {
            }

            @Override
            public void onError(FacebookException error) {
                Toast.makeText(LoginActivity.this, getResources().getString(R.string.please_try_again), Toast.LENGTH_SHORT).show();
            }
        });

        accessTokenTracker = new AccessTokenTracker() {
            @Override
            protected void onCurrentAccessTokenChanged(AccessToken oldAccessToken, AccessToken currentAccessToken) {

            }
        };

        profileTracker = new ProfileTracker() {
            @Override
            protected void onCurrentProfileChanged(Profile oldProfile, Profile cp) {
                if (cp != null){
                    //loginWithFacebook(cp.getId(), cp.getFirstName(), cp.getLastName(), String.valueOf(cp.getProfilePictureUri(300, 300)));
                }
            }
        };

        buttonLogin.setOnClickListener(this);

        tvRegister = findViewById(R.id.tvRegister);
        tvForgotPassword = findViewById(R.id.tvForgotPassword);

        tvRegister.setOnClickListener(this);
        tvForgotPassword.setOnClickListener(this);
        tvGuestUser.setOnClickListener(this);


        /*
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
        */

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void openMainActivity(String token, String pk, String username, String email, boolean isGuest){
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
                startActivity(new Intent(LoginActivity.this, ForgotPasswordActivity.class));
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
