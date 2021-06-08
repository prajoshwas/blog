import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { Text, Icon, TextInput} from 'components';
import {Colors} from 'constants';

export default props => {
    const width = useWindowDimensions().width;
    return (
        <View key={props.blog._id}>
          <View
            style={{
              width: width,
              padding: 10,
              alignContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <View>
              <Text md b style={{padding: 10}}>
                {`by ${props.blog.creator}`}
              </Text>
            </View>
            <Image
              source={{uri: 'data:image/jpg;base64,' + props.blog.image}}
              style={{alignSelf: 'stretch', height: 200}}
            />
            <View style={{padding: 5}}>
              <Text left b xs>
                {props.blog.title}{' '}
              </Text>
              <Text
                left
                xs
                numberOfLines={props.viewIndex === props.index && props.expanded ? undefined : 1}
                style={styles.blogTextContentStyle}>
                {props.blog.content}
              </Text>
              {props.blog.content.length > 63 ? (
                <Text b onPress={() => props.toggleLines(props.index)}>
                  {props.viewIndex === props.index ? 'read less' : 'read more'}
                </Text>
              ) : null}
            </View>
            <View>
              {/* horizontal line */}
              <View
                style={{
                  borderWidth: 1,
                  borderBottomColor: Colors.primary,
                  marginHorizontal: 15,
                  marginBottom: 5,
                }}
              />
              {/* ends here */}
              <View style={styles.mediaButtonsContainer}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => props.likeBlog(props.blog._id)}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon type={'ad'} name="like2" size={24} />
                      <Text  center style={styles.countTextStyle}>Likes</Text>
                      <Text center style={styles.countTextStyle}>
                        {props.blog.likeCount}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconViewStyle}>
                  <TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <Icon type={'oc'} name="comment" size={24} />
                      <Text center style={styles.countTextStyle}>
                        Comments
                      </Text>
                      <Text center style={styles.countTextStyle}>
                        {props.blog.likeCount}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconViewStyle}>
                  <TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <Icon type={'mdi'} name="share-outline" size={24} />
                    <Text center style={styles.countTextStyle}>
                       Share Blog
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{margin: 5}}>
                <TextInput
                  underlineColor='transparent'
                  selectionColor='transparent'
                  outlineColor='transparent'
                  placeholder={'Leave a comment...'}
                  style={{
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 15,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    countTextStyle: {
      alignSelf: 'center',
      paddingLeft: 10,
    },
    iconViewStyle: {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
    },
    blogTextContentStyle: {
      textAlign: 'justify',
      marginTop: 5,
    },
    mediaButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      marginHorizontal: 5,
    },
  });