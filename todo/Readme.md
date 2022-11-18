# To Do

## To Run 

```
$ yarn install
$ yarn start

```
```bash 
 $ npx create-expo-app todo -t expo-template-blank-typescript
 $ yarn start

```

## Flex LayOut

By default, in React Native the layout is arranged using a Flex Box. The default flex direction is "Column". In this case main axis is top to bottom and cross axis is left to right. 

If we change the flex-direction to "Row", then the main axis is Left to Right and cross Axis is Top to bottom.

If we change the flex-direction to "Row-Reverse", then the main axis is Right to Left and Cross axis is Bottom to Top

If we change the flex-direction to "Column-Reverse", then the main axis is Bottom to Top and Cross axis is Right to Left. 

We use "Justify Content" to organize elements across the main axis and "Align Items" to organize elements across the cross axis. 

You can control how much space each item can take on a flex container by setting the flex property. 

flex : 1 (means that item will try to take up remaining space after rendering the other items)
flex :2 (means that item will try to take double the space of remaining items in the container)
