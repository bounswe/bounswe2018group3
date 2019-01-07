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
            sendEmail();
        }
    }

    private void sendEmail(){
        email = etEmail.getText().toString().trim();

        if (!isValidEmail(email)){
            // email is not valid
            Toast.makeText(this, this.getString(R.string.please_enter_a_valid_email), Toast.LENGTH_SHORT).show();
            return;
        }
        progressDialog.setMessage(this.getString(R.string.password_reset_link_is_sent));
        progressDialog.show();

        createEmail();
    }
    private void createEmail(){
        StringRequest jsonObjReq = new StringRequest(Request.Method.POST,
                Constants.PASSWORD_RESET_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        progressDialog.dismiss();
                        try {
                            JSONObject jsonObject = new JSONObject(response);
                            Toast.makeText(ForgotPasswordActivity.this, jsonObject.getString("detail"), Toast.LENGTH_LONG).show();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                progressDialog.dismiss();
                Toast.makeText(ForgotPasswordActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("email", email);
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
