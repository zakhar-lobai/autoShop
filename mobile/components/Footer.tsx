import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import PhoneIcon from '../assets/images/footer/phone.svg';

const COLORS = {
  background: '#222',
  text: '#f9fafb',
  muted: '#9ca3af',
  accent: '#d8b074',
};

const visaImage = require('../assets/images/footer/visa.png');
const masterImage = require('../assets/images/footer/mastercard.png');
const instagramIcon = require('../assets/images/footer/instagram.png');
const facebookIcon = require('../assets/images/footer/facebook.png');

interface Props {
  onNavigate?: (path: string) => void;
  openUrl?: (url: string) => void;
}

export function Footer({ onNavigate, openUrl }: Props) {
  const go = (path: string) => onNavigate?.(path);
  const open = (url: string) => openUrl?.(url);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerBlock}>
        <Text style={styles.footerHeading}>About us</Text>
        <Text style={styles.footerBody}>
          We provide access to a wide fleet of diverse premium cars and transport services. We keep
          growing so the customer is fully satisfied with our rental.
        </Text>
      </View>

      <View style={styles.footerColumns}>
        <View style={styles.footerBlock}>
          <Text style={styles.footerHeading}>Menu</Text>
          <Pressable onPress={() => go?.('/our-fleet')}>
            <Text style={styles.footerLink}>Our fleet</Text>
          </Pressable>
          <Text style={styles.footerLink}>Blog</Text>
        </View>

        <View style={styles.footerBlock}>
          <Text style={styles.footerHeading}>Information</Text>
          <Pressable onPress={() => go?.('/contact')}>
            <Text style={styles.footerLink}>Contact</Text>
          </Pressable>
          <Text style={styles.footerLink}>Terms and conditions of the website</Text>
          <Text style={styles.footerLink}>Privacy policy</Text>
          <Text style={styles.footerLink}>Rental agreement</Text>
          <Text style={styles.footerLink}>Rental terms</Text>
        </View>

        <View style={styles.footerBlock}>
          <Text style={styles.footerHeading}>Contact</Text>
          <Pressable onPress={() => open?.('tel:+48720889788')}>
            <Text style={styles.footerLink}>+48 720 889 788</Text>
          </Pressable>
          <Pressable onPress={() => open?.('mailto:office@blackcars.pl')}>
            <Text style={styles.footerLink}>office@blackcars.pl</Text>
          </Pressable>
          <Text style={styles.footerLink}>Bokserska 64/127, 02-690 Warszawa</Text>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialIcon} onPress={() => open?.('https://www.instagram.com/blackcars.pl/')}>
              <Image source={instagramIcon} style={styles.socialImage} />
            </Pressable>
            <Pressable style={styles.socialIcon} onPress={() => open?.('https://www.facebook.com/blackcarspl/')}>
              <Image source={facebookIcon} style={styles.socialImage} />
            </Pressable>
            <Pressable style={styles.socialIcon} onPress={() => open?.('tel:+48720889788')}>
              <PhoneIcon width={20} height={20} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.paymentRow}>
        <Image source={visaImage} style={styles.paymentLogo} resizeMode="contain" />
        <Image source={masterImage} style={styles.paymentLogo} resizeMode="contain" />
      </View>
      <Text style={[styles.footerBody, { textAlign: 'center', marginTop: 8 }]}>
        © {new Date().getFullYear()} All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  footerColumns: {
    flexDirection: 'column',
    gap: 14,
  },
  footerBlock: {
    marginBottom: 14,
  },
  footerHeading: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    marginBottom: 10,
  },
  footerBody: {
    color: COLORS.muted,
    lineHeight: 20,
  },
  footerLink: {
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialImage: { width: 20, height: 20 },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  paymentLogo: { width: 70, height: 40 },
});
