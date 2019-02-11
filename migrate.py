import glob

for php in glob.glob("ai/*.php"):
    print("Working on " + php)
    html = php.replace(".php", ".html")
    print("HTML File: " + html)
    lines = [line.rstrip('\n') for line in open(php)]
    if (len(lines) > 4):
        title = lines[1].split('"')[1]
        print(title)
        del lines[0:3]
        
        lines[0] = "<!DOCTYPE html><html><head><title>" + title + "</title></head><body><h1>" + title + "</h1><hr/>"
        lines[-1] = "</body><script src='scripts/index.js'></script></html>"
        lines = [l.replace(".php'>", ".html' class='link'>") for l in lines]
        lines = [l.replace(".php\">", ".html\" class='link'>") for l in lines]
        lines = [l.replace("<a href=\"../ai/", "<a href=\"") for l in lines]
        lines = [l.replace("<a href='../ai/", "<a href='") for l in lines]
        lines = [l.replace("<a href=\"../dev/", "<a href=\"") for l in lines]
        lines = [l.replace("<a href='../dev/", "<a href='") for l in lines]
    else:
        print("Dummy file: " + html)

    with open(html, 'w') as f:
        for item in lines:
            f.write("%s\n" % item)
        
for html in glob.glob("*.html"):
    print("Working on " + html)
    lines = [line.rstrip('\n') for line in open(html)]
    if (len(lines) > 2):
        
        lines = [l.replace("<img src='../img", "<img src='img") for l in lines]
        lines = [l.replace("<img src=\"../img", "<img src=\"img") for l in lines]
    else:
        print("Dummy file: " + html)
 
    with open(html, 'w') as f:
        for item in lines:
            f.write("%s\n" % item)
        