//
//  ServiceProvider.swift
//  top-shelf
//
//  Created by DevLabs BG on 4/12/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import Foundation
import TVServices

class ServiceProvider: NSObject, TVTopShelfProvider {

  override init() {
      super.init()
  }

  // MARK: - TVTopShelfProvider protocol

  var topShelfStyle: TVTopShelfContentStyle {
      // Return desired Top Shelf style.
      return .sectioned
  }

  var topShelfItems: [TVContentItem] {
    // Create an array of TVContentItems.
    
    let latestEpisodesIdentifier = TVContentIdentifier(identifier: "Latest episodes", container: nil)!
    let latestEpisodesSection = TVContentItem(contentIdentifier: latestEpisodesIdentifier)!
    latestEpisodesSection.title = "Latest episodes"
    
    var newEpisodesItems = [TVContentItem]()
    
    for index in 0...4 {
      let newApisodeIdentifier = TVContentIdentifier(identifier: "\(index)", container: nil)!
      
      let newEpisodeItem = TVContentItem(contentIdentifier: newApisodeIdentifier)!
      newEpisodeItem.title = "Arrow S0\(index + 1)E01"
      newEpisodeItem.imageURL =  Bundle.main.url(forResource: "season\(index + 1)", withExtension: "jpg")
      
      var components = URLComponents()
      components.scheme = "catalogueapp"
      components.queryItems = [URLQueryItem(name: "episode", value: "\(index + 1)")]
      newEpisodeItem.displayURL = components.url
      
      newEpisodesItems.append(newEpisodeItem)
    }
    
    latestEpisodesSection.topShelfItems = newEpisodesItems
    return [latestEpisodesSection]
  }
}

