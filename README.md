# togo 

Live version can be viewed [here](http://untidy-sun.surge.sh/)

## Setup
Create a .env file in the root with a valid apptoken example : REACT_APP_MAPBOX_TOKEN=*token*

To start project locally:

```
yarn && yarn start
```
### Tools
This application is written with React.js, create-react-app, but rewired with [create-react-app-rewired](https://github.com/timarney/react-app-rewired). The reason for this is that I wanted to use [css modules](https://github.com/css-modules/css-modules). You cannot use css modules without ejecting the create-react-app scripts and so therefore I used create-react-app-rewired for minimal effort.

I used [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) which is a react binding of mapbox-gl-js, this library is recommended by mapbox themselves when creating mapbox applications with react.

### Thoughts

I first started coding without a clear mind of how to handle the state of the application, thinking it wouldnt be much of a state to handle, since there were so few components. After Creating 1-3 components I realised I needed to redo things, because it got tiring sending state back and forth between components. I was thinking of adding redux to the project but quickly thought that that would be unnecessary. I were then thinking of adding reacts own (new) context api. But the documentation stated that this would also be unnecessary for a small application (like this one). I settled with handling the state in <App /> component, passing props down to the children components.
