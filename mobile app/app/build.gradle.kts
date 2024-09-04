plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "vn.edu.fpt.holawear"
    compileSdk = 34

    defaultConfig {
        applicationId = "vn.edu.fpt.holawear"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation ("com.squareup.retrofit2:retrofit:2.9.0")
    //converter-gson:2.9.0 -> giúp convert json sang object
    implementation ("com.squareup.retrofit2:converter-gson:2.9.0")
    //bumptech.glide:glide:4.12.0 -> thư viện load ảnh từ internet
    implementation ("com.github.bumptech.glide:glide:4.12.0")
    implementation ("com.google.code.gson:gson:2.11.0")


    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}