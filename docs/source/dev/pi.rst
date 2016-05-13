The Raspberry Pi
================

We use a Raspberry Pi, running Raspbian Wheezy, to display the 
dashboard on the TV in the datacenter.  This document is less meant
to be helpful and more meant to vent about how long it took to get 
the intrepid contraption set up and doing what I want it to. However,
if it breaks and you're not sure why, this might be helpful.

The Internet
------------

Raspberry pi's don't have wifi hardware by default, so you need to use
a USB adapter/Dongle to get that working or connect to the internet
over ethernet. The latter sounded easier and cheaper, so I took 
the pi from where it lived in the NOC and plugged it in to 
the mac mini ethernet port (in the media room), hoping that I could 
steal that machine's IP address. It turns out, this isn't how 
networking works.  After many days of troubleshooting, including 
reflashing the SD card with Raspbian Wheezy (which was wholly 
unnecessary), I got frustrated, plugged it back in to where it 
was in the NOC, and BOOM it just worked.

THE LESSON: The pi has an allocated IP :code:`10.1.0.207`.  Do 
not try to use any other statically allocated IP. Do not try plugging
it in to other ethernet ports.

THE OTHER LESSON: There is no ethernet port in the datacenter near 
the TV for us to connect to, so I ended up having to run home and
grab a wifi adapter, and we ended up using dhcp anyway.  

WHERE IT ENDED UP: However, in order to SSH into the pi (which we 
want to do), it needed to have a static IP. So we needed it to be 
on our network, no OSU_SECURE or other wifi, so we could use IP 
address we allocated for it. Stay with me here.  We set up a VPN 
connection for the pi so it's part of the OSUOSL network, and then 
assigned it it's IP.  And that's how it connects to the internet.

