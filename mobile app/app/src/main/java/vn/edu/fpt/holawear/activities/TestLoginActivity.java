package vn.edu.fpt.holawear.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;

import vn.edu.fpt.holawear.R;

public class TestLoginActivity extends AppCompatActivity {

    private EditText editTextUserName, editTextPassword;
    private TextView textViewResult;
    private OkHttpClient client = new OkHttpClient();

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_login);

        editTextUserName = findViewById(R.id.editTextUserName);
        editTextPassword = findViewById(R.id.editTextPassword);
        Button buttonLogin = findViewById(R.id.buttonLogin);
        textViewResult = findViewById(R.id.textViewResult);

        buttonLogin.setOnClickListener(v -> login());
    }

    private void login() {
        String url = "http://192.168.1.159:9999/api/login";  // Your API URL

        // Get the input values
        String userName = editTextUserName.getText().toString();
        String password = editTextPassword.getText().toString();

        // Create the JSON request body
        String json = "{\"userName\":\"" + userName + "\",\"password\":\"" + password + "\"}";
        RequestBody body = RequestBody.create(json, JSON);

        // Create the POST request
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        // Make the API call
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> textViewResult.setText("Login failed: " + e.getMessage()));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String responseData = response.body().string();

                runOnUiThread(() -> {
                    if (response.isSuccessful()) {
                        textViewResult.setText(responseData); // Show the response message
                    } else {
                        textViewResult.setText("Login failed");
                    }
                });
            }
        });
    }
}
