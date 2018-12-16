package com.culturalactivities.robin.activities;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.culturalactivities.robin.R;

public class ForgotPasswordActivity extends AppCompatActivity implements View.OnClickListener {

    RequestQueue queue;
    private EditText etEmail;
    private String email;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);
        setVariables();
    }
    private void setVariables(){
        queue = Volley.newRequestQueue(this);
        progressDialog = new ProgressDialog(this);
        etEmail = (EditText) findViewById(R.id.etEmail);
        TextView tvLogin = (TextView) findViewById(R.id.tvLogin);
        Button buttonSend = (Button) findViewById(R.id.buttonSend);
        tvLogin.setOnClickListener(this);
        buttonSend.setOnClickListener(this);
    }
    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.tvLogin){
            onBackPressed();
        }else if (v.getId() == R.id.buttonSend){
            //sendEmail();
        }
    }
    public final static boolean isValidEmail(CharSequence target) {
        return !TextUtils.isEmpty(target) && android.util.Patterns.EMAIL_ADDRESS.matcher(target).matches();
    }
}
