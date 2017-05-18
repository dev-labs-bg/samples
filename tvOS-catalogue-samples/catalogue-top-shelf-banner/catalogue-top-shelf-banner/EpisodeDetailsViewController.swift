//
//  EpisodeDetailsViewController.swift
//  catalogue-tvos
//
//  Created by DevLabs BG on 3/31/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import UIKit

class EpisodeDetailsViewController: UIViewController {
  
  // MARK: - Singleton properties
  
  // MARK: - Static properties
  
  // MARK: - Public properties
  
  // MARK: - Public methods
  
  // MARK: - Initialize/Livecycle methods
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    episodeCoverFocusGuide = UIFocusGuide()
    playButtonFocusGuide = UIFocusGuide()
  }
  
  // MARK: - Override methods
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  override func didUpdateFocus(in context: UIFocusUpdateContext, with coordinator: UIFocusAnimationCoordinator) {
    super.didUpdateFocus(in: context, with: coordinator)
    
    print("")
  }
  
  // MARK: - Private properties
  
  @IBOutlet weak var episodeCoverImageView: UIImageView!
  
  @IBOutlet weak var episodeCoverHolder: EpisodeCoverView!
  
  @IBOutlet var playButtons: [UIButton]!
  
  fileprivate var episodeCoverFocusGuide: UIFocusGuide! {
    didSet {
      view.addLayoutGuide(episodeCoverFocusGuide)
      episodeCoverFocusGuide.leftAnchor.constraint(equalTo: episodeCoverHolder.leftAnchor).isActive = true
      episodeCoverFocusGuide.topAnchor.constraint(equalTo: playButtons.last!.topAnchor).isActive = true
      episodeCoverFocusGuide.widthAnchor.constraint(equalTo: episodeCoverHolder.widthAnchor).isActive = true
      episodeCoverFocusGuide.heightAnchor.constraint(equalTo: episodeCoverHolder.heightAnchor).isActive = true
      episodeCoverFocusGuide.preferredFocusEnvironments = [episodeCoverHolder]
    }
  }
  
  fileprivate var playButtonFocusGuide: UIFocusGuide! {
    didSet {
      view.addLayoutGuide(playButtonFocusGuide)
      if let _lastPlayButton = playButtons.last {
        playButtonFocusGuide.leftAnchor.constraint(equalTo: _lastPlayButton.leftAnchor).isActive = true
        playButtonFocusGuide.topAnchor.constraint(equalTo: episodeCoverHolder.topAnchor).isActive = true
        playButtonFocusGuide.widthAnchor.constraint(equalTo: _lastPlayButton.widthAnchor).isActive = true
        playButtonFocusGuide.heightAnchor.constraint(equalTo: _lastPlayButton.heightAnchor).isActive = true
        playButtonFocusGuide.preferredFocusEnvironments = [_lastPlayButton]
      }
    }
  }
  
  // MARK: - Private methods
  
}
