# Swifty.js testing package 0.0.1

# How to use
This testing package is a ready to use Swifty.js project directory.

## Running Swifty Test Server

To start the Swifty.js testing server, run the following command in your terminal from the project directory:

```bash
$ npm start

> start
> node main.mjs

Initializing Swifty.js server at port 3000 ...

Swifty.js server is currently running at port 3000.

Press Ctrl + C to stop running the server.
```

Then head to http://localhost:3000/ on a web browser. You should see a screen like this:

![image](https://github.com/swiftyjs/testing-pckg/assets/115911859/c70e06df-0039-4bd3-970e-885bd3d1b2a0)

Now, if you compare the original static **src/pages/index.html** code with the code in the *Swifty.js App* tab under the **index page**, you will notice that the **`<component1>`** element has been replaced with the code from the **component1.html** component.

![image](https://github.com/swiftyjs/testing-pckg/assets/115911859/bc12e6b5-65c3-4732-98ab-e6f45b6c1af8)


Swifty.js uses the components stored at **src/library** to create dynamic HTML for display.

## Start Editing

Give it a shot! Edit the **component1.html** component in the library, then hop back to the *Swifty.js App* tab and hit refresh to see your changes in action.

By now, you might be getting the hang of how **Swifty.js** does its magic!

## Create a New Component

Ready for some creativity? Create a new component! Let's call it **mycomponent.html**. Fill it with your awesome content. Make sure it is located at **src/library**.

Now, head over to **src/pages/index.html**. Replace the existing **`<component1>`** element with your new **`<mycomponent>`**. Save the changes and refresh the *Swifty.js App* tab to see your creation live!
