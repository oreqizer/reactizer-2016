### Troubleshooting

when having problems, go to `./build.gradle` and add this

```gradle
// is >=1.3.1 by default
// see: https://facebook.github.io/react-native/docs/android-setup.html#content
classpath 'com.android.tools.build:gradle:1.2.3'
```

into `buildscript.dependencies`.
