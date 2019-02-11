import glob

for html in glob.glob("*.html"):
    print("Working on " + html)
    lines = [line.rstrip('\n') for line in open(html)]
 
    with open('sitemap.txt', 'a') as f:
        f.write("https://solegaonkar.github.io/%s\n" % html)
        