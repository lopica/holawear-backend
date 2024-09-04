package vn.edu.fpt.holawear;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import vn.edu.fpt.holawear.activities.FoodishActivity;

public class MainActivity extends AppCompatActivity {

    private Button navigateButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        navigateButton = findViewById(R.id.navigateButton);

        // Navigate to FoodishActivity when the button is clicked
        navigateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, FoodishActivity.class);
                startActivity(intent);
            }
        });
    }
}
