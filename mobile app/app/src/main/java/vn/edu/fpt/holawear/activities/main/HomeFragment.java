package vn.edu.fpt.holawear.activities.main;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import vn.edu.fpt.holawear.R;
import vn.edu.fpt.holawear.activities.SearchActivity;

public class HomeFragment extends Fragment {

    private TextView textViewHey;
    private LinearLayout searchLayout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        // Initialize the TextView
        textViewHey = view.findViewById(R.id.textViewHey);
        searchLayout = view.findViewById(R.id.searchLayout);

        // Get the username from SharedPreferences
        SharedPreferences sharedPreferences = getActivity().getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE);
        String userName = sharedPreferences.getString("name", "name");

        // Get the current text from the TextView
        String existingText = textViewHey.getText().toString();

        // Concatenate the existing text with the username and set it to the TextView
        textViewHey.setText(existingText + " " + userName);

        searchLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to the SearchActivity
                Intent intent = new Intent(getActivity(), SearchActivity.class);
                startActivity(intent);
                
            }
        });


        return view;
    }

}