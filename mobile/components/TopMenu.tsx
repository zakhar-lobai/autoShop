import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, TouchableOpacity, Platform, Linking} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IconSymbol} from '@/components/ui/icon-symbol';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {Colors} from '@/constants/theme';
import LogoSvg from '../assets/images/Logo.svg';
import BurgerSvg from '../assets/images/burger.svg';
import CloseSvg from '../assets/images/close-icon.svg';

export function TopMenu() {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const BAR_HEIGHT = 60;
  const headerHeight = insets.top + BAR_HEIGHT;

  return (
    <>
      <View style={[styles.container, {paddingTop: insets.top, height: headerHeight}]}> 
        <Link href="/" asChild>
          <Pressable style={styles.leftGroup} onPress={() => { /* navigates via Link */ }}>
            <LogoSvg width={styles.logo.width} height={styles.logo.height} />
          </Pressable>
        </Link>

        <TouchableOpacity
          accessibilityLabel={open ? 'Close menu' : 'Open menu'}
          onPress={() => setOpen(s => !s)}
          style={styles.burger}>
          {open ? <CloseSvg width={26} height={26} /> : <BurgerSvg width={26} height={26} />}
        </TouchableOpacity>
      </View>

      {open ? (
        <View style={[StyleSheet.absoluteFillObject, {zIndex: 900}]}>
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />

          <View style={[styles.menu, {top: headerHeight, paddingBottom: insets.bottom + 18}]}> 

            <View style={styles.links}>
              <Link href="/" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="house.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Home</Text>
                </Pressable>
              </Link>

              <Link href="/our-fleet" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="car.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Our Fleet</Text>
                </Pressable>
              </Link>

              <Link href="/rental-with-driver" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="person.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Rental With a Driver</Text>
                </Pressable>
              </Link>

              <Link href="/special-offer" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="tag.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Special Offers</Text>
                </Pressable>
              </Link>

              <Link href="/services" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="wrench.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Services</Text>
                </Pressable>
              </Link>

              <Link href="/contact" asChild>
                <Pressable style={styles.linkItem} onPress={() => setOpen(false)}>
                  <IconSymbol name="phone.fill" size={18} color={colors.icon} />
                  <Text style={[styles.linkText, {color: colors.text}]}>Contact</Text>
                </Pressable>
              </Link>

              {/* BOOK ONLINE button */}
              <Pressable style={[styles.bookBtnShort]} onPress={() => { setOpen(false); router.push('/booking' as any); }}>
                <Text style={styles.bookBtnText}>BOOK ONLINE</Text>
              </Pressable>

              {/* Contact icons row */}
              <View style={styles.contactRowCentered}>
                <Pressable style={styles.contactCircle} onPress={() => { setOpen(false); Linking.openURL('mailto:lobajzahar@gmail.com'); }}>
                  <IconSymbol name="envelope.fill" size={18} color="#ffffff" />
                </Pressable>

                <Pressable style={styles.contactCircle} onPress={() => { setOpen(false); Linking.openURL('tel:+48732829653'); }}>
                  <IconSymbol name="phone.fill" size={18} color="#ffffff" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 14,
    paddingBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: '#000',
  },
  leftGroup: {flexDirection: 'row', alignItems: 'center'},
  burger: {padding: 8},
  title: {fontSize: 18, fontWeight: '700', marginLeft: 10},
  logo: {width: 136, height: 42},
  iconImage: {width: 26, height: 26},
  backdrop: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)'},
  menu: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 0,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: '#000',
  },
  menuHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  menuTitle: {fontSize: 18, fontWeight: '700'},
  closeBtn: {padding: 6},
  links: {marginTop: 4},
  linkItem: {paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.04)', paddingHorizontal: 6},
  linkText: {fontSize: 16, marginLeft: 12},
  bookBtn: {marginTop: 12, backgroundColor: '#d8b074', paddingVertical: 12, borderRadius: 10, alignItems: 'center', alignSelf: 'stretch'},
  bookBtnShort: {marginTop: 18, backgroundColor: '#d8b074', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, alignItems: 'center', width: '70%', alignSelf: 'center'},
  bookBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
  contactRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignSelf: 'stretch', paddingHorizontal: 8},
  contactRowCentered: {flexDirection: 'row', justifyContent: 'center', marginTop: 18},
  contactCircle: {width: 48, height: 48, borderRadius: 24, backgroundColor: '#d8b074', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10},
});
