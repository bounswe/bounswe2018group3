package com.culturalactivities.robin.activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ProgressBar;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
import com.culturalactivities.robin.R;
import com.culturalactivities.robin.fragments.MainPageFragment;
import com.culturalactivities.robin.fragments.ProfileFragment;
import com.culturalactivities.robin.fragments.SettingsFragment;

public class MainActivity extends AppCompatActivity {

    private AHBottomNavigation bottomNavigation;
    private FragmentTransaction fragmentTransaction;
    public static String email, username, pk, token;
    public static Typeface ubuntuRegular, ubuntuBold, ubuntuItalic;
    @SuppressLint("StaticFieldLeak")
    public static ProgressBar progressBar;
    public static boolean isGuest;


    @Override
    protected void onStart() {
        super.onStart();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setView();
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void setView() {
        progressBar = findViewById(R.id.progressBar);
        token = getIntent().getStringExtra("token");
        pk = getIntent().getStringExtra("pk");
        username = getIntent().getStringExtra("username");
        email = getIntent().getStringExtra("email");
        isGuest = getIntent().getBooleanExtra("isGuest",true);
        ubuntuRegular = Typeface.createFromAsset(getAssets(), "fonts/Ubuntu-Regular.ttf");
        ubuntuBold = Typeface.createFromAsset(getAssets(), "fonts/Ubuntu-Bold.ttf");
        ubuntuItalic = Typeface.createFromAsset(getAssets(), "fonts/Ubuntu-Italic.ttf");

        if (isGuest){
            fragmentTransaction = getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment, MainPageFragment.newInstance()).commit();
        }else {
            setNavigation();
        }
    }

    private void setNavigation(){
        bottomNavigation = findViewById(R.id.xbottom_navigation);
        bottomNavigation.setDefaultBackgroundColor(getResources().getColor(R.color.colorPrimary));
        bottomNavigation.setAccentColor(Color.WHITE);
        bottomNavigation.setInactiveColor(getResources().getColor(R.color.colorPrimaryLigth));

        // Create items
        AHBottomNavigationItem item0 = new AHBottomNavigationItem(R.string.settings, R.drawable.settings, R.color.colorPrimaryLigth);
        bottomNavigation.addItem(item0);
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.home_page, R.drawable.home, R.color.colorPrimaryLigth);
        bottomNavigation.addItem(item1);

        AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.profile, R.drawable.profile, R.color.colorPrimaryLigth);
        bottomNavigation.addItem(item3);
        bottomNavigation.setCurrentItem(1);

        // Add items
        fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.fragment, MainPageFragment.newInstance()).commit();
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                fragmentTransaction = getSupportFragmentManager().beginTransaction();
                switch (position) {
                    case 0:
                        fragmentTransaction.replace(R.id.fragment, SettingsFragment.newInstance()).commit();
                        break;
                    case 1:
                        fragmentTransaction.replace(R.id.fragment, MainPageFragment.newInstance()).commit();
                        break;
                    case 2:
                        fragmentTransaction.replace(R.id.fragment, ProfileFragment.newInstance(MainActivity.pk)).commit();
                        break;
                }
                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        if (!isGuest){
            getMenuInflater().inflate(R.menu.menu_main, menu);
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if(id==R.id.action_register){
            finish();
            Intent intent = new Intent(MainActivity.this, RegisterActivity.class);
            startActivity(intent);
            return true;
        }
        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
            transaction.add(R.id.fragment, SettingsFragment.newInstance());
            transaction.addToBackStack("addSF");
            transaction.commit();
            return true;
        }
        //noinspection SimplifiableIfStatement
        if (id == R.id.action_logout) {
            finish();
            getSharedPreferences("login", MODE_PRIVATE).edit().clear().apply();
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
