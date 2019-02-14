import glob
import os

os.remove("sitemap.txt")

for html in glob.glob("*.html"):
    print("Working on " + html)
    lines = [line.rstrip('\n') for line in open(html)]
    lines = [line.replace('</script></script>', '</script>') for line in lines]

    with open(html, 'w') as f:
        for item in lines:
            f.write("%s\n" % item)
   
 
    with open('sitemap.txt', 'a') as f:
        f.write("https://solegaonkar.github.io/%s\n" % html)
