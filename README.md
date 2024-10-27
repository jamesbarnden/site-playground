# site-playground

Start the server with:
`npm run dev`

Hosted at:
`http://localhost:3000`

`vercel` to deploy

* Tutorial: https://nextjs.org/learn-pages-router/basics/create-nextjs-app
* Documentation: https://nextjs.org/docs
* Deploying to Vercel: https://vercel.com/docs/deployments/overview

```
Add tags to an image
exiftool -Keywords="tag1,tag2,tag3" path/to/your/image.jpg

Add tags to multiple images in a directory
exiftool -Keywords="tag1,tag2,tag3" path/to/your/directory/*.jpg

Append new tags without removing existing ones
exiftool -Keywords+="newtag1,newtag2" path/to/your/image.jpg

Remove all keywords
exiftool -Keywords= path/to/your/image.jpg

View current IPTC tags
exiftool -Keywords path/to/your/image.jpg

Remember, ExifTool creates a backup of the original file by default. If you don't want this, you can use the `-overwrite_original` option:
exiftool -overwrite_original -Keywords="tag1,tag2,tag3" path/to/your/image.jpg
```
