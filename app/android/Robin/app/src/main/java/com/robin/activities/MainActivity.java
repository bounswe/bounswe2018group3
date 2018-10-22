package com.robin.activities;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
import com.robin.R;
import com.robin.fragments.EventsFragment;
import com.robin.fragments.MainPageFragment;
import com.robin.fragments.ProfileFragment;

public class MainActivity extends AppCompatActivity {

    private AHBottomNavigation bottomNavigation;
    private FragmentTransaction fragmentTransaction;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setView();
    }

    private void setView() {
        email = getIntent().getStringExtra("email");
        Toast.makeText(this, email, Toast.LENGTH_SHORT).show();
        setNavigation();
    }

    private void setNavigation(){
        bottomNavigation = findViewById(R.id.bottom_navigation);
        bottomNavigation.setDefaultBackgroundColor(getResources().getColor(R.color.colorPrimary));
        bottomNavigation.setAccentColor(getResources().getColor(R.color.colorAccent));
        bottomNavigation.setInactiveColor(Color.BLACK);

        // Create items
        AHBottomNavigationItem item0 = new AHBottomNavigationItem(R.string.my_events, R.drawable.ic_event_available_black_24dp, R.color.colorPrimaryLigth);
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.main_page, R.drawable.ic_home_black_24dp, R.color.colorPrimaryLigth);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.profile, R.drawable.ic_person_black_24dp, R.color.colorPrimaryLigth);

        // Add items
        bottomNavigation.addItem(item0);
        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.setCurrentItem(1);


        fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.fragment, MainPageFragment.newInstance()).commit();
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                fragmentTransaction = getSupportFragmentManager().beginTransaction();
                switch (position) {
                    case 0:
                        fragmentTransaction.replace(R.id.fragment, EventsFragment.newInstance()).commit();
                        break;
                    case 1:
                        fragmentTransaction.replace(R.id.fragment, MainPageFragment.newInstance()).commit();
                        break;
                    case 2:
                        fragmentTransaction.replace(R.id.fragment, ProfileFragment.newInstance()).commit();
                        break;
                }
                return true;
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
