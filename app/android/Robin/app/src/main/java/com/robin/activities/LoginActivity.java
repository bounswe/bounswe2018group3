package com.robin.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.robin.R;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText etEmail, etPassword;
    private Button buttonLogin, buttonGoogle, buttonFacebook;
    private String testEmail = "a@a.a", testPassword = "123qwe";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);

        buttonLogin = findViewById(R.id.buttonLogin);
        buttonGoogle = findViewById(R.id.buttonGoogle);
        buttonFacebook = findViewById(R.id.buttonFacebook);

        buttonLogin.setOnClickListener(this);
        buttonGoogle.setOnClickListener(this);
        buttonFacebook.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.buttonLogin:
                login();
                break;
            case R.id.buttonGoogle:
                break;
            case R.id.buttonFacebook:
                break;
        }
    }

    private void login() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (TextUtils.isEmpty(email)){
            Toast.makeText(this, "Email can not be empty", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(password)){
            Toast.makeText(this, "Password can not be empty", Toast.LENGTH_SHORT).show();
            return;
        }

        if (email.equals(testEmail) && password.equals(testPassword)){
            Toast.makeText(this, "Giriş Başarılı. Anasayfaya yönlendiriliyorsunuz.", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            intent.putExtra("email", email);
            startActivity(intent);
            finish();
        } else {
            Toast.makeText(this, "Tekrar deneyin!", Toast.LENGTH_SHORT).show();
        }

    }
}
