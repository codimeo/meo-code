In Snap, it is possible to add new categories to the palette pane.
Use this in an embedded Javascript :

```
function(category, r, g, b) {
    if(!this.categories.include(category.toLowerCase() {
        SpriteMorph.prototype.categories.push(category.toLowerCase());
        SpriteMorph.prototype.blockColor[category.toLowerCase()] = new Color(r, g, b);
    }
    this.world().children[0].refreshIDE();
}
```
